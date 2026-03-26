// models/Poll.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Poll = sequelize.define("Poll", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM("active", "closed", "scheduled"),
    defaultValue: "scheduled",
  },
});

module.exports = Poll;