const Expense = require('../models/expenses');

const addExpense = (req, res) => {
    const { expenseamount, description, category } = req.body;

    // if(amount === undefined  ){
    //     return res.status(400).json({success: false, message: 'Parameters missing'})
    // }
    
    Expense.create({ expenseamount, description, category}).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(500).json({success : false, error: err})
    })
}


module.exports = {addExpense};
    
