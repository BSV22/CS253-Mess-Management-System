const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rebate = sequelize.define('Rebate', {
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending'
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, { timestamps: true });

module.exports = Rebate;