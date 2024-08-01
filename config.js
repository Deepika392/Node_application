const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('POC', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;