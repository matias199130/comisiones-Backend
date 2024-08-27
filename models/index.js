const { Sequelize } = require('sequelize');
const path = require('path');

// Cargar variables de entorno
require('dotenv').config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Cambiar según el tipo de base de datos
});

// Exportar la instancia de Sequelize y los modelos
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Aquí puedes cargar tus modelos
// Ejemplo: db.Project = require('./project')(sequelize, Sequelize);

module.exports = db;
