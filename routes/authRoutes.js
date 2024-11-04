
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rutas de autenticación
router.post('/register', AuthController.register); // Registrar usuario
router.post('/login', AuthController.login); // Iniciar sesión

module.exports = router;