const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDatabase');
const RegistroTurnos = require('./RegistroTurnos');
const Insumos = require('./Insumos');

const DetallesTurnos = sequelize.define('DetallesTurnos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_turno: {  // Cambio de id_produccion a id_turno
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RegistroTurnos,
            key: 'id',
        },
    },
    id_insumo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Insumos,
            key: 'id',
        },
    },
    cantidad_inicial: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: false,
    },
    cantidad_final: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: false,
    }
});

// Relaciones
RegistroTurnos.hasMany(DetallesTurnos, { foreignKey: 'id_turno' });
DetallesTurnos.belongsTo(RegistroTurnos, { foreignKey: 'id_turno' });
DetallesTurnos.belongsTo(Insumos, { foreignKey: 'id_insumo' });

module.exports = DetallesTurnos;
