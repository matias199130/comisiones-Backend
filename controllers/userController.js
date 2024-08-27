const jwt = require('jsonwebtoken');
const pool = require('../config/config');

// Función para autenticar al usuario
const login = async (req, res) => {
    const { username, password } = req.body;

    // Verifica el usuario en la base de datos
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password]);

    if (rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Generar el token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

module.exports = { login };
