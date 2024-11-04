const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');
const Almacenes = require('./Almacenes');
const Insumos = require('./Insumos'); // Asegúrate de tener el modelo de insumos

const InventarioAlmacen = sequelize.define('InventarioAlmacen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Almacenes,
            key: 'id',
        },
    },
    id_insumo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Insumos,
            key: 'id',
        },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

Almacenes.hasMany(InventarioAlmacen, { foreignKey: 'id_almacen' });
Insumos.hasMany(InventarioAlmacen, { foreignKey: 'id_insumo' });

module.exports = InventarioAlmacen;