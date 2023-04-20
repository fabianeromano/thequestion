const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const User_Advantage = db.define(
  "user_advantage",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = User_Advantage;
