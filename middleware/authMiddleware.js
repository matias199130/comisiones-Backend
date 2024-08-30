const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
   /*  if (process.env.NODE_ENV === 'development') {
        return next(); // Omite la autenticación en desarrollo
    } */

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        return next(); // Omite la autenticación en desarrollo
    }
        
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
};

const verifyUser = (req, res, next) => {
    // Asegúrate de que el usuario esté autenticado
    if (!req.user) {
        return res.sendStatus(401); // Usuario no autenticado
    }
    next(); // Continuar si el usuario está autenticado
};


module.exports = { authenticateToken, verifyAdmin, verifyUser };
