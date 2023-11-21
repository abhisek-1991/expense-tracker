const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const path = require('path');
//const userAuthentication = require('../middleware/auth');

// Define routes for signup and login
router.post('/user', userController.signup);
router.post('/login', userController.login);
router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '../main/login.html'));
});
router.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../main/signup.html'));
    
}); 
//router.get('/user/premium',userController.check_premium);
module.exports = router;
