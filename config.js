const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;