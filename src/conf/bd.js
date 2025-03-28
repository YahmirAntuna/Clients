import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,  // Dirección
        port: process.env.DB_PORT,
        dialect: 'mysql',
        loggin: false,  // Corregido de "loggin" a "logging"
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión con éxito.'))
    .catch(err => console.error('No se pudo conectar: ', err));

export default sequelize;
