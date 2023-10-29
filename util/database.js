const Sequelize = require('sequelize');



const sequelize = new Sequelize('expense', 'root', process.env.DB_password,{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;