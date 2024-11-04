const express = require('express');
const router = express.Router();
const DetallesTurnosControllerController = require('../controllers/DetallesTurnosController');

// Crear un nuevo turno con detalles de insumos
router.post('/', DetallesTurnosControllerController.create);

// Obtener todos los turnos con detalles de insumos
router.get('/', DetallesTurnosControllerController.findAll);

module.exports = router;