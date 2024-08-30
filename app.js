require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importar la conexión a la base de datos
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken, verifyAdmin } = require('./middleware/authMiddleware');
const categoriesRoutes = require('./routes/categoriaRoutes'); // Ajusta la ruta según sea necesario

// Crear una instancia de Express
const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api/projects', authenticateToken, projectRoutes); // Protege las rutas de proyectos con autenticación
app.use('/api/projects/admin', authenticateToken, verifyAdmin, projectRoutes); // Rutas que requieren permisos de admin
app.use('/api/users', userRoutes);
app.use('/api', categoriesRoutes); // Utiliza las rutas para categorías
// Ruta de inicio

app.get('/', (req, res) => {
    res.send('Bienvenido al API del partido La Libertad Avanza');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(process.env.PORT || 3001, async () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`)
try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito');
} catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
}
});

