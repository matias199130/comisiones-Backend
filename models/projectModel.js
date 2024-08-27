const db = require('../backend/config');

const createProjectTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS proyectos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre_proyecto VARCHAR(255) NOT NULL,
            fecha_ingresada DATE NOT NULL,
            proyeccion ENUM('HCD','CAMPAÑA 2025','CAMPAÑA 2027') NOT NULL,
            estado ENUM('Pendiente', 'En Proceso', 'Completado') NOT NULL,
            archivo_documento VARCHAR(255) NOT NULL,
            categoria_id INT,
            FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        )
    `);

    await db.query(`
        INSERT INTO proyectos (nombre_proyecto, fecha_ingresada, proyeccion, estado, archivo_documento, categoria_id)
        VALUES 
        ('Proyecto X', '2024-08-06', 'HCD', 'Pendiente', 'documento.pdf', 1),
        ('Proyecto Y', '2024-08-06', 'CAMPAÑA 2027', 'Pendiente', 'documento.pdf', 5),
        ('ALSKDNA', '2024-08-06', 'HCD', 'Pendiente', 'asdlajsna.pdf', 1)
    `);
};

createProjectTable();

module.exports = db;
