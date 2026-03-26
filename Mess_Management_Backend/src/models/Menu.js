const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Menu = sequelize.define('Menu', {
    day: {
        type: DataTypes.ENUM('Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        allowNull: false
    },
    mealType: {
        type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner'),
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, { timestamps: true });

module.exports = Menu;