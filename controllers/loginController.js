const jwt = require('jsonwebtoken');
const pool = require('../config/config'); // Asegúrate de que esto apunta a tu configuración de base de datos

// Controlador para el inicio de sesión
const login = async (req, res) => {
    const { documento } = req.body;

    if (!documento) {
        return res.status(400).json({ error: 'Documento es necesario' });
    }

    try {
        // Consulta para verificar el usuario
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE documento = ?', [documento]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Documento no encontrado' });
        }

        const user = rows[0];

        // Generar un token JWT
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el login' });
    }
};

module.exports = { login };
