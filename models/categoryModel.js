const db = require('../backend/config');

const createCategoryTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre_categoria VARCHAR(255) NOT NULL
        )
    `);

    await db.query(`
        INSERT INTO categorias (nombre_categoria) VALUES 
        ('Salud y Medio Ambiente'), 
        ('Obras Públicas, Servicios e Infraestructura'), 
        ('Seguridad y Legislación'), 
        ('Obras, Servicios, Transportes'), 
        ('Presupuesto y Hacienda'), 
        ('RR.HH., Minoridad y Familia')
    `);
};

createCategoryTable();

module.exports = db;
