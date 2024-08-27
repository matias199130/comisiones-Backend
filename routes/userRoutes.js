// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { login } = require('../controllers/loginController');

// Ruta para el login de usuarios
router.post('/login', login);

module.exports = router;
