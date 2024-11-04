
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Ruta protegida
router.get('/protected', AuthController.verifyToken, (req, res) => {
    res.status(200).json({ message: 'Acceso autorizado', userId: req.userId });
});

module.exports = router;