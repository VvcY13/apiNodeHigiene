const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');


const Insumos = sequelize.define('Insumos',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('ROLLO', 'POLVO', 'CAJA'),
        allowNull: false,
    },
    unidadMedida: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['metros', 'kilos', 'unidades']],
        },
    },
    diametroInterno: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
    },
    diametroExterno: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
    },
    espesorTela: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
    },
    pesoStandar: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
    },
    pesoPorBolsa: {
        type: DataTypes.DECIMAL(8, 2), 
        allowNull: true,
    },
});

module.exports = Insumos;