const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');

const Products = sequelize.define('Products',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2, 50],
    },
});

module.exports = Products;