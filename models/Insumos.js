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
        type: DataTypes.ENUM('DIAMETRO', 'KILO'), 
        allowNull: false,
    },
    diametroStandar: {
        type: DataTypes.DECIMAL(8, 2), 
        allowNull: true, 
    },
    pesoStandar: {
        type: DataTypes.DECIMAL(8, 2), 
        allowNull: true, 
    },
})


module.exports = Insumos;