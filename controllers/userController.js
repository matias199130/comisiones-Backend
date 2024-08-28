const jwt = require('jsonwebtoken');
const pool = require('../config/config');

// Función para autenticar al usuario

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

module.exports = { getAllUsers };
