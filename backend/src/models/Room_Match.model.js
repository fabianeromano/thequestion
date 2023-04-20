const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     RoomMatch:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the Game Room.
 *         userId:
 *           type: integer
 *           description: The User id of the Game Room.
 *         opponentUserId:
 *           type: integer
 *           description: The opponent Id of the Game Room.
 *         dataRoom:
 *           type: object
 *           description: The data of the Game Room.
 *           properties:
 *             questions:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Questions'
 *             player1:
 *               type: object
 *               properties:
 *                 correctAnswers:
 *                   type: array
 *                   description: Total correct answers.
 *                 incorrectAnswers:
 *                   type: array
 *                   description: Total incorrect answers.
 *                 points:
 *                   type: integer
 *                   description: Total points won.
 *                 hammer:
 *                   type: integer
 *                   description: Total advantage used.
 *                 magicWand:
 *                   type: integer
 *                   description: Total advantage used.
 *             player2:
 *               type: object
 *               properties:
 *                 correctAnswers:
 *                   type: array
 *                   description: Total correct answers.
 *                 incorrectAnswers:
 *                   type: array
 *                   description: Total incorrect answers.
 *                 points:
 *                   type: integer
 *                   description: Total points won.
 *                 hammer:
 *                   type: integer
 *                   description: Total advantage used.
 *                 magicWand:
 *                   type: integer
 *                   description: Total advantage used.
 *         status:
 *           type: string
 *           description: Status of the Room.
 *         typeGame:
 *           type: string
 *           description: Type Game of the Room.
 *       example:
 *         id: 1
 *         userId: 2
 *         opponentUserId: 4
 *         dataRoom:
 *           questions: []
 *           player1:
 *             correctAnswers:
 *               - 1
 *               - 2
 *             incorrectAnswers:
 *               - 1
 *               - 2
 *             points: 0
 *             hammer: 2
 *             magicWand: 2
 *           player2:
 *             correctAnswers:
 *               - 1
 *               - 2
 *             incorrectAnswers:
 *               - 1
 *               - 2
 *             points: 20
 *             hammer: 2
 *             magicWand: 2
 *         status: 'playing'
 *         typeGame: 'random o friend'
 *     CreateRoom:
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: The User id of the Game Room.
 *       example:
 *         userId: 2
 *     CreateRoomFriend:
 *       required:
 *         - userId
 *         - opponentUserId
 *       properties:
 *         userId:
 *           type: integer
 *           description: The User id of the Game Room.
 *         opponentUserId:
 *           type: integer
 *           description: The opponent Id of the Game Room.
 *       example:
 *         userId: 2
 *         opponentUserId: 4
 *     UpdateRoomSolitary:
 *       properties:
 *         correctAnswers:
 *           type: array
 *           description: Total correct answers.
 *         incorrectAnswers:
 *           type: array
 *           description: Total incorrect answers.
 *         points:
 *           type: integer
 *           description: Total points won.
 *         hammer:
 *           type: integer
 *           description: Total advantage used.
 *         magicWand:
 *           type: integer
 *           description: Total advantage used.
 *       example:
 *         correctAnswers:
 *           - 1
 *           - 2
 *         incorrectAnswers:
 *           - 1
 *           - 2
 *         points: 0
 *         hammer: 2
 *         magicWand:
 *     UpdateRoomGroup:
 *       properties:
 *         player1:
 *           type: object
 *           properties:
 *             correctAnswers:
 *               type: array
 *               description: Total correct answers.
 *             incorrectAnswers:
 *               type: array
 *               description: Total incorrect answers.
 *             points:
 *               type: integer
 *               description: Total points won.
 *             hammer:
 *               type: integer
 *               description: Total hammer used.
 *             magicWand:
 *               type: integer
 *               description: Total magic wand used.
 *       example:
 *         player1:
 *           correctAnswers:
 *             - 1
 *             - 2
 *           incorrectAnswers:
 *             - 1
 *             - 2
 *           points: 0
 *           hammer: 2
 *           magicWand: 2
 */

const Room_Match = db.define("room_match", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id"
  },
  opponentUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "opponent_user_id"
  },
  dataRoom: {
    type: DataTypes.JSON,
    allowNull: true,
    field: "data_room"
  },
  status: {
    type: DataTypes.ENUM("waiting", "playing", "refused", "finished"),
    defaultValue: "waiting"
  },
  typeGame: {
    type: DataTypes.ENUM("random", "friends", "solitary"),
    defaultValue: "random"
  }
});

module.exports = Room_Match;
