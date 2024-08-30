const express = require('express');
const router = express.Router();
const pool = require('../config/config'); // Asegúrate de que esta ruta apunte a tu archivo de configuración de la base de datos
const { authenticateToken } = require('../middleware/authMiddleware'); // Asegúrate de que este middleware exista

// Obtener todas las categorías (acceso para todos los usuarios autenticados)
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias');
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron categorías' });
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

module.exports = router;
