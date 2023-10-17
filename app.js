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

User.hasMany(expense);
expense.belongsTo(User);

sequelize.sync()
    .then(() => {
    // The database tables are dropped and recreated
    console.log('Database synchronized');
    app.listen(4000);
    })
    .catch(err=>{
        console.log(err);
    });