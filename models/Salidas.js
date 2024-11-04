const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');

const Salidas = sequelize.define('Salidas',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nroGuia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})


module.exports = Salidas;