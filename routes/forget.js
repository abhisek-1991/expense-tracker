const express = require('express');
const resetpasswordController = require('../controller/forget');

const router = express.Router();

// POST route for updating password
router.post('/updatepassword/:resetpasswordid', resetpasswordController.updatepassword);

// GET route for rendering the password reset form
router.get('/resetpassword/:id', resetpasswordController.resetpassword);

// POST route for initiating the forgot password flow
router.post('/forgotpassword', resetpasswordController.forgotpassword);

module.exports = router;
