const Almacenes = require('../models/Almacenes');
const Insumos = require('../models/Insumos');
const InventarioAlmacen = require('../models/InventarioAlmacen');
const Salidas = require('../models/Salidas');
const SalidasDetalles = require('../models/SalidasDetalles');
const StockGeneral = require('../models/StockGeneral');
const Products = require('../models/Products');
const Medidas = require('../models/Medidas');

// Definiciones de asociaciones
Almacenes.hasMany(InventarioAlmacen, { foreignKey: 'id_almacen' });
Insumos.hasMany(InventarioAlmacen, { foreignKey: 'id_insumo' });
InventarioAlmacen.belongsTo(Almacenes, { foreignKey: 'id_almacen' });
InventarioAlmacen.belongsTo(Insumos, { foreignKey: 'id_insumo' });

// Asociaciones entre Salidas y SalidaDetalles
Salidas.hasMany(SalidasDetalles, { foreignKey: 'salidaId' });
SalidasDetalles.belongsTo(Salidas, { foreignKey: 'salidaId' });

// Asociaciones entre SalidaDetalles y StockGeneral
SalidasDetalles.belongsTo(StockGeneral, { foreignKey: 'stockGeneralId', as: 'stockGeneral' });
StockGeneral.hasMany(SalidasDetalles, { foreignKey: 'stockGeneralId' });

// Asociaciones entre StockGeneral y Products
StockGeneral.belongsTo(Products, { foreignKey: 'productoId', as: 'producto' });
Products.hasMany(StockGeneral, { foreignKey: 'productoId' });

// Asociaciones entre StockGeneral y Medidas
StockGeneral.belongsTo(Medidas, { foreignKey: 'medidaId', as: 'medida' });
Medidas.hasMany(StockGeneral, { foreignKey: 'medidaId' });

module.exports = {
    Almacenes,
    Insumos,
    InventarioAlmacen,
    Salidas,
    SalidasDetalles,
    StockGeneral,
    Products,
    Medidas,
};
