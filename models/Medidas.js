const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');


const Medidas = sequelize.define('Medidas',{
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
    largo:{
        type: DataTypes.DECIMAL(8,2),
        allowNull: false,
       
    },
    ancho:{
        type: DataTypes.DECIMAL(8,2),
        allowNull: false,
    },
    unidadesPorBolsa:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unidadesPorBolsones:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Medidas;