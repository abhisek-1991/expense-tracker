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

const getAllExpenses = (req, res) => {
    Expense.findAll({where : {userId: req.user.id}})
        .then(expenses => {
            return res.status(200).json({ expenses, success: true });
            //console.log(expenses);
        })
        .catch(err => {
            return res.status(500).json({ success: false, error: err });
        });
};


const deleteExpense = (req, res) => {
    const expenseId = req.params.id;
  
    Expense.destroy({ where: { id: expenseId } })
      .then(() => {
        res.status(204).end(); // Respond with a 204 status code (No Content) to indicate success
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while deleting the expense' });
      });
  };




module.exports = {addExpense,getAllExpenses,deleteExpense};
    
