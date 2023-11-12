const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    password: Sequelize.STRING,

    isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

})

module.exports = User;
