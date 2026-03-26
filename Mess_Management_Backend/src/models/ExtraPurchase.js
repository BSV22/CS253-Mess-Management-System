// models/ExtraPurchase.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ExtraPurchase = sequelize.define("ExtraPurchase", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, { timestamps: true });

module.exports = ExtraPurchase;