// models/PollOption.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PollOption = sequelize.define("PollOption", {
  mealType: {
    type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = PollOption;