const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100] 
          }
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 250] 
          }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1, 6] 
          }
    },
    image: DataTypes.STRING, 

});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
