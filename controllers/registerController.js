// controllers/registerController.js
const pool = require('../config/config'); // Asegúrate de tener configurado el pool de conexiones

exports.register = async (req, res) => {
    const { documento, rol } = req.body;

    if (!documento || !rol) {
        return res.status(400).json({ error: 'Documento y rol son necesarios' });
    }

    try {
        const [result] = await pool.query('INSERT INTO usuarios (documento, rol) VALUES (?, ?)', [documento, rol]);
        res.status(201).send("usuario registrado");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};
