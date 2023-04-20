const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const User_Achievement = db.define(
  "user_achievement",
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

module.exports = User_Achievement;
