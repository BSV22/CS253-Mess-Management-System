const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
    rollNo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    id_key: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomNo: {
        type: DataTypes.STRING
    },
    messCardStatus: {
        type: DataTypes.ENUM('Active', 'Pending', 'Suspended'),
        defaultValue: 'Active'
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending'
    }
}, { timestamps: true });

module.exports = Student;