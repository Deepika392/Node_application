const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Role = require('./Role');
const Module = require('./Module');

const Permission = sequelize.define('Permission', {
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    },
   
  },
  moduleId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Module,
      key: 'id'
    },
   
  },
  can_read: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  can_write: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  can_edit: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  can_delete: {
    type: DataTypes.INTEGER, 
    allowNull: false
  }
});

// Define associations
Permission.belongsTo(Role, { foreignKey: 'roleId' });
Permission.belongsTo(Module, { foreignKey: 'moduleId' });

module.exports = Permission;
