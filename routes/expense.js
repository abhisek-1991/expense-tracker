const express = require('express');
const expenseController = require('../controller/expense');
const router = express.Router();

//const path = require('path');


router.post('/expense', expenseController.addExpense);
router.get('/expense',expenseController.getAllExpenses);
router.delete('/expense/:id', expenseController.deleteExpense);




module.exports = router;
