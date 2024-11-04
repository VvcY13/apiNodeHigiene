const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');

const RegistroTurnos = sequelize.define('RegistroTurnos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   
});
module.exports = RegistroTurnos;