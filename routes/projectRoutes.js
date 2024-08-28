const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const { authenticateToken, verifyAdmin } = require('../middleware/authMiddleware');

// Obtener todos los proyectos (acceso para todos los usuarios autenticados)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proyectos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
});



// Obtener proyectos específicos por ID de categoría (acceso para todos los usuarios autenticados)
router.get('/:categoria_id', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proyectos WHERE categoria_id = ?', [req.params.categoria_id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No se encontraron proyectos para esta categoría' });
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
});


// Crear un nuevo proyecto (solo para administradores)
router.post('/', authenticateToken, verifyAdmin, async (req, res) => {
    const { nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id } = req.body;

    if (!nombre_proyecto || !fecha_ingresada || !proyeccion || !estado || !archivo_documento || !categoria_id) {
        return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO proyectos (nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id]
        );

        res.status(201).send("su proyecto ha sido creado");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
});

// Actualizar un proyecto (solo para administradores)
router.put('/:id', authenticateToken, verifyAdmin, async (req, res) => {
    const { nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id } = req.body;
    const { id } = req.params;

    if (!nombre_proyecto && !fecha_ingresada && !proyeccion && !estado && !archivo_documento && !categoria_id) {
        return res.status(400).json({ error: 'Se debe proporcionar al menos un campo para actualizar' });
    }

    try {
        const [result] = await pool.query(
            `UPDATE proyectos
            SET nombre_proyecto = COALESCE(?, nombre_proyecto),
                fecha_ingresada = COALESCE(?, fecha_ingresada),
                proyeccion = COALESCE(?, proyeccion),
                estado = COALESCE(?, estado),
                archivo_documento = COALESCE(?, archivo_documento),
                categoria_id = COALESCE(?, categoria_id)
            WHERE id = ?`,
            [nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id, id]
        );

        if (result.affectedRows > 0) {
            res.send('Proyecto actualizado');
        } else {
            res.status(404).send('Proyecto no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
});

// Eliminar un proyecto (solo para administradores)
router.delete('/:id', authenticateToken, verifyAdmin, async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM proyectos WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.send('Proyecto eliminado');
        } else {
            res.status(404).send('Proyecto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el proyecto');
    }
});

module.exports = router;
