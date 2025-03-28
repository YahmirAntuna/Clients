import { DataTypes } from 'sequelize';
import sequelize from '../conf/bd.js';

// Representación del modelo de la tabla 'clientes'
const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false, // Desactiva createdAt y updatedAt
    tableName: 'clientes', // Asegura que el nombre de la tabla coincida con la base de datos
});

export default Cliente;
