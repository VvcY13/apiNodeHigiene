const express = require('express');
const router = express.Router();
const inventarioAlmacenController = require('../controllers/InventarioAlmacenController');

// Crear un nuevo registro de inventario
router.post('/', inventarioAlmacenController.create);

// Obtener todos los registros de inventario
router.get('/', inventarioAlmacenController.findAll);

// Obtener un registro de inventario por ID
router.get('/:id', inventarioAlmacenController.findOne);

// Actualizar un registro de inventario por ID
router.put('/:id', inventarioAlmacenController.update);

// Eliminar un registro de inventario por ID
router.delete('/:id', inventarioAlmacenController.delete);

// Ruta para obtener inventarios del almacén específico
router.get('/almacen/:id', inventarioAlmacenController.findAllByAlmacen);

module.exports = router;
