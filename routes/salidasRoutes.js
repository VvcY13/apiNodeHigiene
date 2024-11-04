
// src/routes/salidasRoutes.js
const express = require('express');
const router = express.Router();
const SalidasController = require('../controllers/SalidasController');

// Registrar una nueva salida
router.post('/', SalidasController.createSalida);

// Obtener todas las salidas
router.get('/', SalidasController.getAllSalidas);

module.exports = router;