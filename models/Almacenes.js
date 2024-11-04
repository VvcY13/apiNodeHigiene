const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');


const Almacenes = sequelize.define('Almacenes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Garantiza que cada almacén tenga un nombre único
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Almacenes;