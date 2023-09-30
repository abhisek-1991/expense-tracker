const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sequelize = require('./util/database');
const User = require('./models/users');
const expense = require('./models/expenses');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
//app.use(express.static(path.join(__dirname, 'main','signup')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'main')));

app.use('/',userRoutes);
app.use('/',expenseRoutes);


app.listen(4000,()=>{
    console.log('server is running');
});