const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const path = require('path');

// Define routes for signup and login
router.post('/user', userController.signup);
router.post('/login', userController.login);
router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '../main/login.html'));
});
router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../main/signup.html'));
});

module.exports = router;
