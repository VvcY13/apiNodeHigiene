
const express = require('express');
const router = express.Router();
const MedidasController = require('../controllers/MedidasController');

// Rutas de medidas
router.post('/', MedidasController.createMedida); // Crear medida
router.get('/', MedidasController.getAllMedidas); // Obtener todas las medidas
router.get('/:id', MedidasController.getMedidaById); // Obtener una medida por ID
router.put('/:id', MedidasController.updateMedida); // Actualizar una medida
router.delete('/:id', MedidasController.deleteMedida); // Eliminar una medida

module.exports = router;