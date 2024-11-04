const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const swaggerJSDoc = require('swagger-jsdoc');


router.get('/', UserController.getAllUsers); // Obtener todos los usuarios
router.get('/:id', UserController.getUserById); // Obtener un usuario por ID
router.put('/:id', UserController.updateUser); // Actualizar un usuario
router.delete('/:id', UserController.deleteUser); // Eliminar un usuario

module.exports = router;