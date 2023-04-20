const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const User_Topic = db.define(
  "user_topic",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = User_Topic;
