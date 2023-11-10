const User = require("../models/users");
const Expense = require("../models/expenses");
const sequelize = require("../util/database");


const getUserLeaderboard = async (req,res)=>{
    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregatedExpenses = {}
        //console.log(expenses);
        //console.log(users);
        expenses.forEach((expense)=>{
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId]+= expense.expenseamount;
            } else{
                userAggregatedExpenses[expense.userId]=expense.expenseamount;
            }
        })
        let userLeaderBoardDetails =[];
        users.forEach((user)=>{
            if(userAggregatedExpenses[user.id]!== undefined){
            userLeaderBoardDetails.push({name: user.name,total_cost: userAggregatedExpenses[user.id]});
            }
        })
        userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
        console.log(userAggregatedExpenses);
        res.status(200).json(userLeaderBoardDetails);
        console.log(userLeaderBoardDetails);

    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}

module.exports= {getUserLeaderboard};