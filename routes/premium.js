const express = require('express');
const expenseController = require('../controller/premium');
const router = express.Router();
const userauthentication = require('../middleware/auth');
//const path = require('path');


router.post('/expense',userauthentication.auth, expenseController.addExpense);
router.get('/premium',userauthentication.auth,expenseController.getAllExpenses);        // update these routes with backend of premium feature
router.delete('/expense/:id', userauthentication.auth,expenseController.deleteExpense);




module.exports = router;
