const Sequelize = require('sequelize');

const customLogger = (msg)=> {

};

const sequelize = new Sequelize('expense', 'root', process.env.DB_password,{
    dialect: 'mysql',
    host: 'localhost',
    logging: customLogger,
});

module.exports = sequelize;