const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     Questions:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id.
 *         question:
 *           type: string
 *           description: The question.
 *         difficulty:
 *           type: integer
 *           description: The difficulty.
 *         img:
 *           type: string
 *           description: The img.
 *         correctAnswer:
 *           type: string
 *           description: The correctAnswer.
 *         incorrectAnswers:
 *           type: array
 *           description: The incorrectAnswers.
 *       example:
 *         id: 1
 *         question: 'Cual es color del caballo blanco de simon bolivar'
 *         difficulty: 1
 *         img: 'https://img.png'
 *         correctAnswer: 'blanco'
 *         incorrectAnswers:
 *           - name
 *           - name
 *           - name
 */

const Question = db.define(
  "question",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 3
      }
    },
    img: {
      type: DataTypes.STRING,
      defaultValue:
        "https://img.freepik.com/free-vector/flat-people-asking-questions-illustration_23-2148910627.jpg"
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "correct_answer"
    },
    incorrectAnswers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      field: "incorrect_answers"
    }
  },
  {
    timestamps: false
  }
);

module.exports = Question;
