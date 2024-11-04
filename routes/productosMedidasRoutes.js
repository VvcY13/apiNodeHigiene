const express = require('express');
const router = express.Router();
const ProductosMedidasController = require('../controllers/ProductosMedidasController');

router.post('/', ProductosMedidasController.createProductoMedida); // Crear producto medida
router.get('/', ProductosMedidasController.getAllProductosMedidas); // Obtener todos los productos medidas
router.get('/:id', ProductosMedidasController.getProductoMedidaById); // Obtener un producto medida por ID
router.put('/:id', ProductosMedidasController.updateProductoMedida); // Actualizar un producto medida
router.delete('/:id', ProductosMedidasController.deleteProductoMedida); // Eliminar un producto medida

module.exports = router;