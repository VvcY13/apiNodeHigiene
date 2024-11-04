const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');
const Products = require('./Products');
const Medidas = require('./Medidas');

const ProductosMedidas = sequelize.define('ProductosMedidas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id',
        },
    },
    id_medida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Medidas,
            key: 'id',
        },
    },
    cantidad_unitaria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Products.belongsToMany(Medidas, { through: ProductosMedidas, foreignKey: 'id_producto' });
Medidas.belongsToMany(Products, { through: ProductosMedidas, foreignKey: 'id_medida' });

module.exports = ProductosMedidas;