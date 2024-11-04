
const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');

// Rutas de productos
router.post('/', ProductsController.createProduct); // Crear producto
router.get('/', ProductsController.getAllProducts); // Obtener todos los productos
router.get('/:id', ProductsController.getProductById); // Obtener un producto por ID
router.put('/:id', ProductsController.updateProduct); // Actualizar un producto
router.delete('/:id', ProductsController.deleteProduct); // Eliminar un producto

module.exports = router;