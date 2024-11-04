// src/routes/almacenesRoutes.js
const express = require('express');
const router = express.Router();
const AlmacenesController = require('../controllers/AlmacenesController');

// Obtener todos los almacenes
router.get('/', AlmacenesController.getAllAlmacenes);

// Obtener un almacén por ID
router.get('/:id', AlmacenesController.getAlmacenById);

// Crear un nuevo almacén
router.post('/', AlmacenesController.createAlmacen);

// Actualizar un almacén
router.put('/:id', AlmacenesController.updateAlmacen);

// Eliminar un almacén
router.delete('/:id', AlmacenesController.deleteAlmacen);

module.exports = router;
