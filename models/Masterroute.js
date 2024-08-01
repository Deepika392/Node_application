const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Module = require('./Module');

const Masterroute = sequelize.define('Masterroute', {
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Module,
        key: 'id'
    }},
    
  route_path:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  route_elm:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  permission_type:{
    type: DataTypes.STRING,
    allowNull: true,
 }
,
 
});

Masterroute.belongsTo(Module, { foreignKey: 'moduleId' });

module.exports = Masterroute;
