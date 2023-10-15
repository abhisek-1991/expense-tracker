const express = require('express');
const expenseController = require('../controller/expense');
const router = express.Router();
const userauthentication = require('../middleware/auth');
//const path = require('path');


router.post('/expense', expenseController.addExpense);
router.get('/expense',userauthentication.auth,expenseController.getAllExpenses);
router.delete('/expense/:id', expenseController.deleteExpense);




module.exports = router;
