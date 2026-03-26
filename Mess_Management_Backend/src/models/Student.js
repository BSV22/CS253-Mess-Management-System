/** Student Model with facephoto (lowercase) field mapping */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
    rollNo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    facePhoto: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'facephoto'
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
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: true });

module.exports = Student;