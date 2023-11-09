const express = require('express');
const premiumController = require('../controller/premium');
const router = express.Router();
const userauthentication = require('../middleware/auth');
//const path = require('path');


//router.post('/expense',userauthentication.auth, premiumController.);
router.get('/showLeaderBoard',premiumController.getUserLeaderboard);        // update these routes with backend of premium feature
//router.delete('/expense/:id', userauthentication.auth,expenseController.deleteExpense);




module.exports = router;
