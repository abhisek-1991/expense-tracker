const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Aksingh@1993',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;