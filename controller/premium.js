const User = require("../models/users");
const Expense = require("../models/expenses");
const sequelize = require("../util/database");


const getUserLeaderboard = async (req,res)=>{
    try{
        const userLeaderBoardDetails = await User.findAll({
            
            order:[['totalExpenses','DESC']]
        })
        res.status(200).json(userLeaderBoardDetails);
        //console.log(userLeaderBoardDetails);

    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}

module.exports= {getUserLeaderboard};