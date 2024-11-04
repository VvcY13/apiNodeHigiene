const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');
const Products = require('./Products');
const Medidas = require('./Medidas');

const ProduccionProductosMedidas = sequelize.define('ProduccionProductosMedidas', {
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
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ProduccionProductosMedidas.belongsTo(Products, { foreignKey: 'productoId' });
ProduccionProductosMedidas.belongsTo(Medidas, { foreignKey: 'medidaId' });

module.exports = ProduccionProductosMedidas;