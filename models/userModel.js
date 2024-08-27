const db = require('../backend/config');
const bcrypt = require('bcryptjs');

const createUserTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            documento INT NOT NULL,
            password VARCHAR(255) NOT NULL,
            rol ENUM('admin', 'user') NOT NULL
        )
    `);

    const hashedPasswordAdmin = await bcrypt.hash('admin_password', 10);
    const hashedPasswordUser = await bcrypt.hash('user_password', 10);

    await db.query(`
        INSERT INTO usuarios (documento, password, rol) VALUES
        (36493747, '${hashedPasswordAdmin}', 'admin'),
        (15669633, '${hashedPasswordUser}', 'user')
    `);
};

createUserTable();

module.exports = db;
