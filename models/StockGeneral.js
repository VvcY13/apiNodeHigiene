const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');

const StockGeneral = sequelize.define('StockGeneral', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Products', key: 'id' },
  },
  medidaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Medidas', key: 'id' },
  },
  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = StockGeneral;