const db = require('../../models/projectModel');

exports.getProjects = async (req, res) => {
    try {
        const [projects] = await db.query('SELECT * FROM proyectos');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos' });
    }
};

exports.createProject = async (req, res) => {
    const { nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id } = req.body;
    try {
        await db.query(
            'INSERT INTO proyectos (nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id]
        );
        res.status(201).json({ message: 'Proyecto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear proyecto' });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id } = req.body;
    try {
        await db.query(
            'UPDATE proyectos SET nombre_proyecto = ?, fecha_ingresada = ?, proyeccion = ?, estado = ?, archivo_documento = ?, categoria_id = ? WHERE id = ?',
            [nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id, id]
        );
        res.status(200).json({ message: 'Proyecto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar proyecto' });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM proyectos WHERE id = ?', [id]);
        res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar proyecto' });
    }
};
