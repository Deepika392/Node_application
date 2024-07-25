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
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: DataTypes.STRING, 

});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
