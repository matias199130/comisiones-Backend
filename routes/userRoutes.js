// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { login  } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getAllUsers } = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', getAllUsers);

// Ruta para el login de usuarios
router.post('/login', login);

// Ruta para el registro de usuarios
router.post('/register', register);

module.exports = router;
