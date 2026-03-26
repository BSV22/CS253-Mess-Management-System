// models/Config.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Config = sequelize.define("Config", {
  key: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = Config;
