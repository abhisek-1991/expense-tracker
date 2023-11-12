const Expense = require('../models/expenses');
const User =require('../models/users');
const sequelize = require('../util/database');


const addExpense = async (req, res) => {
    const t = await sequelize.transaction();// Define t at a higher scope
  
    try {
      
  
      const { expenseamount, description, category } = req.body;
  
      // if(amount === undefined  ){
      //     return res.status(400).json({success: false, message: 'Parameters missing'})
      // }
  
      const expense = await Expense.create({
        expenseamount,
        description,
        category,
        userId: req.user.id},
        {transaction: t
      });
  
      const totalExpenses = Number(req.user.totalExpenses) + Number(expenseamount);
      console.log(totalExpenses);
  
      await User.update(
        {
          totalExpenses: totalExpenses,
        },
        {
          where: { id: req.user.id },
          transaction: t,
        });
      
  
      await t.commit();
       res.status(201).json({ expense, success: true });
    } catch (err) {
      
        await t.rollback();
      
      return res.status(500).json({ success: false, error: err });
    }
};
  
  
const getAllExpenses = (req, res) => {
    //console.log(res.body);
    Expense.findAll({where : {userId: req.user.id}})
        .then(expenses => {
            //console.log("result of controller expense line 21>>>>>>>",expenses);
            return res.status(200).json({ expenses, success: true });
            //console.log(expenses);
        })
        .catch(err => {
            return res.status(500).json({ success: false, error: err });
        });
};


const deleteExpense = (req, res) => {
    const expenseId = req.params.id;
  
    Expense.destroy({ where: { id: expenseId ,userId: req.user.id} })
      .then(() => {
        res.status(204).end(); // Respond with a 204 status code (No Content) to indicate success
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while deleting the expense' });
      });
  };




module.exports = {addExpense,getAllExpenses,deleteExpense};
    
