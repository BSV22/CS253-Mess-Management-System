// models/Vote.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vote = sequelize.define("Vote", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PollId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Polls',
      key: 'id'
    }
  },
  PollOptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PollOptions',
      key: 'id'
    }
  },
  StudentRollNo: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'rollNo'
    }
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['PollId', 'StudentRollNo', 'PollOptionId']
    }
  ]
});

module.exports = Vote;