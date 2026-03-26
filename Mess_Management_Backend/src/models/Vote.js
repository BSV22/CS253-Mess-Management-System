// models/Vote.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vote = sequelize.define("Vote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Vote;