const express = require('express');
const router = express.Router();
const InsumosController = require('../controllers/InsumosController');

// Rutas de insumos
router.post('/', InsumosController.createInsumo); // Crear insumo
router.get('/', InsumosController.getAllInsumos); // Obtener todos los insumos
router.get('/:id', InsumosController.getInsumoById); // Obtener un insumo por ID
router.put('/:id', InsumosController.updateInsumo); // Actualizar un insumo
router.delete('/:id', InsumosController.deleteInsumo); // Eliminar un insumo

module.exports = router;