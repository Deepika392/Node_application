const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Category = sequelize.define('Category', {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
});

module.exports = Category;
