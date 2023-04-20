const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the Topic.
 *         name:
 *           type: string
 *           description: The name of the Topic.
 *       example:
 *         id: 1
 *         name: 'Geografía'
 */

const Topic = db.define(
  "topic",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = Topic;
