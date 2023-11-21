require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sequelize = require('./util/database');
const purchaseRoutes = require('./routes/purchase');
const User = require('./models/users');
const expense = require('./models/expenses');
const Forgotpassword = require('./models/forgot_password');
const order = require('./models/orders');
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const premiumRoutes = require('./routes/premium');
const forgetRoutes = require('./routes/forget');
//app.use(express.static(path.join(__dirname, 'main','signup')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'main')));

app.use('/',userRoutes);
app.use('/',expenseRoutes);
app.use('/',purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',forgetRoutes);

User.hasMany(expense);
expense.belongsTo(User);

User.hasMany(order);
order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


sequelize.sync()
    .then(() => {
    // The database tables are dropped and recreated
    console.log('Database synchronized');
    app.listen(4000);
    })
    .catch(err=>{
        console.log(err);
    });