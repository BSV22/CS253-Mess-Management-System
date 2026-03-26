const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define('Feedback', {
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 },
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.ENUM('Food Quality', 'Cleanliness', 'Service', 'Other'),
        defaultValue: 'Food Quality'
    }
}, { timestamps: true });

module.exports = Feedback;