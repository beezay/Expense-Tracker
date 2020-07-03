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
            createdAt: new Date()
        });
        res.status(201).send().json({"msg": "Created"}); 
})

//Delete Expense
router.delete('/:id', async (req, res) => {
    const expenses = await loadExpenseCollection(); 

    await expenses.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

    res.status(200).send();
});

//Edit Expenses
/*
router.put('/:id', async (req,res) => {
    const expenses = await loadExpenseCollection();

    await expenses.findOneAndUpdate({_id: new mongodb.ObjectID(req.params.id)}, {
        expensename: req.body.expensename,
        expensedescrption: req.body.expensedescrption,
        expenseamount: req.body.expenseamount,
        modifiedAt: new Date()
    });

    res.status(200).send();
})
*/
async function loadExpenseCollection() {
    const client = await mongodb.MongoClient.connect
        ('mongodb+srv://testadmin:testpwd@cluster0.dvo7w.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });

    return client.db('vue_express').collection('expense');
}

module.exports = router;