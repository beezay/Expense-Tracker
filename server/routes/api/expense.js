const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

//GET request FOR HOME expense
router.get('/', async(req, res) => {
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const expenses = await loadExpenseCollection();
    console.log('test', req.query);
    let filter = {};
    if(req.query.date && req.query.date == "TODAY") {
        const date = new Date();
        const getFormattedDate = formatDate(date);
        filter = {$or: [{ dateofexpense: getFormattedDate }  ]};
    } 
    else if(req.query.date && req.query.date == "SEVENDAYS") {
        const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const toDate = new Date();
        const getFormattedFromDate = formatDate(fromDate);
        const getFormattedToDate = formatDate(toDate);
        filter = {$or: [{ dateofexpense: { $gte: getFormattedFromDate, $lt: getFormattedToDate } }]};
    }
    else if(req.query.date && req.query.date == "30DAYS") {
        const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        const toDate = new Date();
        const getFormattedFromDate = formatDate(fromDate);
        const getFormattedToDate = formatDate(toDate);
        filter = {$or: [{ dateofexpense: { $gte: getFormattedFromDate, $lt: getFormattedToDate } }]};
    }

    res.send(await expenses.find(filter).toArray());
});



//GET Request for EDIT
router.get('/:id', async(req, res) => {
    const expenses = await loadExpenseCollection();
    res.send(await expenses.find(
        {$or: [{_id: new mongodb.ObjectID(req.params.id)}]}).toArray());
});

//Add Expense
router.post('/', async (req, res) => {
    const expenses = await loadExpenseCollection();
      
        await expenses.insertOne({
            expensename: req.body.expensename,
            expensedescrption: req.body.expensedescrption,
            expenseamount: req.body.expenseamount,
            dateofexpense: req.body.dateofexpense,
            createdAt: new Date()
        });
        res.status(201).json({msg: "Created"}).send(); 
})

//Delete Expense
router.delete('/:id', async (req, res) => {
    const expenses = await loadExpenseCollection(); 

    await expenses.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

    res.status(200).json({msg: "Deleted"}).send();
});

//Edit Expenses
router.post('/:id', async (req,res) => {
    const expenses = await loadExpenseCollection();

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const updateexpenses = {}
    // console.log("ok",req.body, req.body.expensename)
    if(typeof req.body.expensename !== "undefined"){
        updateexpenses.expensename = req.body.expensename
    }

    if(typeof req.body.expensedescrption !== "undefined"){
        updateexpenses.expensedescrption = req.body.expensedescrption
    }

    if(typeof req.body.expenseamount !== "undefined"){
        updateexpenses.expenseamount = req.body.expenseamount
    }

    if(typeof req.body.dateofexpense !== "undefined"){
        updateexpenses.dateofexpense = req.body.dateofexpense
    }

    if(isEmpty(updateexpenses)) {
        // Object is empty (Would return true in this example)
        res.status(200).json({msg: "No file sent"}).send();
    } else {
        // Object is NOT empty
        updateexpenses.modifiedAt = new Date();
        await expenses.update({$or: [{_id: new mongodb.ObjectID(req.params.id)}]},
        { $set: updateexpenses});

    res.status(200).json({msg: "Updated"}).send();
    }
    
    console.log("test",updateexpenses )
    
})

async function loadExpenseCollection() {
    const client = await mongodb.MongoClient.connect
        ('mongodb+srv://testadmin:testpwd@cluster0.dvo7w.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });

    return client.db('vue_express').collection('expense');
}

module.exports = router;