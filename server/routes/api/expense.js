const express = require('express');
const mongodb = require('mongodb');
const mongoose  = require('mongoose');


const router = express.Router();

//GET expense
router.get('/', async(req, res) => {
    const expenses = await loadExpenseCollection();
    res.send(await expenses.find({}).toArray());
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
router.put('/:id', async (req,res) => {
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
        await expenses.update({$or: [{_id: new mongodb.ObjectID(req.params.id)}]},
        { $set: updateexpenses});

    res.status(200).json({msg: "Updated"}).send();
    }
    
    console.log("test",updateexpenses )
    // if(Object.keys(updateexpenses).length === 0 && updateexpenses.constructor === Object) {
        
    //     console.log("aaaa");

    // }
})

async function loadExpenseCollection() {
    const client = await mongodb.MongoClient.connect
        ('mongodb+srv://testadmin:testpwd@cluster0.dvo7w.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });

    return client.db('vue_express').collection('expense');
}

module.exports = router;