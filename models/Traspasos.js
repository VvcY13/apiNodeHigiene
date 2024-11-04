const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');
const Almacenes = require('./Almacenes');
const Insumos = require('./Insumos');

const Traspasos = sequelize.define('Traspasos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    origen_almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Almacenes,
            key: 'id',
        },
    },
    destino_almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Almacenes,
            key: 'id',
        },
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Traspasos;