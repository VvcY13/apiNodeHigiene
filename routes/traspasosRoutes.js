const express = require('express');
const router = express.Router();
const traspasosController = require('../controllers/TraspasosController');

// Crear un nuevo traspaso
router.post('/', traspasosController.createTraspaso);

// Obtener todos los traspasos
router.get('/', traspasosController.getAllTraspasos);

// Obtener un traspaso por ID
router.get('/:id', traspasosController.getTraspasoById);

// Actualizar un traspaso
router.put('/:id', traspasosController.updateTraspaso);

// Eliminar un traspaso
router.delete('/:id', traspasosController.deleteTraspaso);

module.exports = router;