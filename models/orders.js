const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order= sequelize.define('orders',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentId:{
        type:Sequelize.STRING,
    },
    orderId:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:false
    },
    userId:{
        type:Sequelize.INTEGER
    }

    
})

module.exports= Order;