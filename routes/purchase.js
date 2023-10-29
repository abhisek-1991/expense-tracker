const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchase_cont');
const userauthentication = require('../middleware/auth');

router.get('/buypremium',userauthentication.auth,purchaseController.buypremium);
router.post('/update_transaction',userauthentication.auth,purchaseController.update_transaction);
router.post('/failed_transaction',userauthentication.auth,purchaseController.failed_transaction);

module.exports = router;


