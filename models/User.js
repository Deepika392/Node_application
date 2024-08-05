const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Role = require('./Role');

const User = sequelize.define('User', {
 
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50] 
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50] 
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50] 
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      isEmail: true,
    },
    validate: {
      len: [1, 60] 
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
