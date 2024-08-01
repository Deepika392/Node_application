const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Module = sequelize.define('Module', {
  moduleName:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Module;
