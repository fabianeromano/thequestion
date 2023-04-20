const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the News.
 *         title:
 *           type: string
 *           description: The name of the News.
 *         summary:
 *           type: string
 *           description: The description of the News.
 *         img:
 *           type: string
 *           description: The image's url of the News.
 *         link:
 *           type: string
 *           description: The price of the News.
 *       example:
 *         id: 1
 *         title: 'Gran descubrimiento espacial'
 *         summary: 'Un impresionante hallazgo espacial se ha dado a conocer en las últimas horas. Si quieres conocer más, entra al link.'
 *         img: 'https://galeriadeimagenes.com/via-lactea.jpg'
 *         link: 'https://eldiario.com/noticias/gran-descubrimiento-espacial'
 *         topicId: 5
 */

const News = db.define(
  "news",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://legal-express.ru/main/img/news-default.png"
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = News;
