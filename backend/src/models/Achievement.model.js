const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the Achievement.
 *         name:
 *           type: string
 *           description: The name of the Achievement.
 *         description:
 *           type: string
 *           description: The description of the Achievement.
 *         iconImg:
 *           type: string
 *           description: The image's url of the Achievement.
 *       example:
 *         id: 1
 *         name: 'Trotamundos'
 *         description: 'Responde correctamente 5 preguntas de Geografía.'
 *         iconImg: 'https://galeriadeimagenes.com/globo-terraqueo.jpg'
 */

const Achievement = db.define(
  "achievement",
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconImg: {
      type: DataTypes.STRING,
      defaultValue: "https://image.pngaaa.com/941/4173941-middle.png",
      field: "icon_img"
    }
  },
  {
    timestamps: false
  }
);

module.exports = Achievement;
