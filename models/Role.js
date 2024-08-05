const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Role = sequelize.define('Role', {
  roleName:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100] // Ensures roleName is between 1 and 100 characters
    }
  },
 
});

module.exports = Role;
