// src/models/SalidaDetalles.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');
const Salidas = require('./Salidas'); // Asegúrate de que estás importando el modelo Salidas
const StockGeneral = require('./StockGeneral'); // Asegúrate de que estás importando el modelo StockGeneral

const SalidasDetalles = sequelize.define('SalidasDetalles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    salidaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Salidas, 
            key: 'id',
        },
    },
    stockGeneralId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: StockGeneral, 
            key: 'id',
        },
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});


module.exports = SalidasDetalles;
