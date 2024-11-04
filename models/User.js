const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2, 50],
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [2, 50],
    },
    tipoDocumento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroDocumento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        len: [5, 15],
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    estado: {
        type : DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = User;