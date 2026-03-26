const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MessManager = sequelize.define('MessManager', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

module.exports = MessManager;