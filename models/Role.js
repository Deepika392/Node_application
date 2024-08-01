const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Role = sequelize.define('Role', {
  roleName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

module.exports = Role;
