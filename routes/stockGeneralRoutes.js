// src/routes/stockGeneralRoutes.js
const express = require('express');
const router = express.Router();
const StockGeneralController = require('../controllers/StockGeneralController');

// Obtener todos los registros de stock general
router.get('/', StockGeneralController.getAllStockGeneral);

// Obtener un registro de stock general por ID
router.get('/:id', StockGeneralController.getStockGeneralById);

// Crear un nuevo registro de stock general
router.post('/', StockGeneralController.createStockGeneral);

// Actualizar un registro de stock general
router.put('/:id', StockGeneralController.updateStockGeneral);

// Eliminar un registro de stock general
router.delete('/:id', StockGeneralController.deleteStockGeneral);

module.exports = router;