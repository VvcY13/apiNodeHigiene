const express = require('express');
const router = express.Router();
const produccionController = require('../controllers/ProduccionController');


// Ruta para registrar una producción
router.post('/', produccionController.registrarProduccion);

// Otras rutas
router.get('/', produccionController.getAllProducciones);
router.get('/:id', produccionController.getProduccionById);
router.put('/:id', produccionController.updateProduccion);
router.delete('/:id', produccionController.deleteProduccion);

module.exports = router;