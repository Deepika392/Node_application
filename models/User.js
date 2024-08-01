const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Role = require('./Role');

const User = sequelize.define('User', {
 
  username:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      isEmail: true,
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Role,
        key: 'id'
    }
},
 
});

User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;
