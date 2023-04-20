const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const codeGenerate = () => Math.floor(Math.random() * 900000) + 100000;

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The User ID.
 *         username:
 *           type: string
 *           description: The name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User.
 *         password:
 *           type: string
 *           description: The password of the User.
 *         lifes:
 *           type: integer
 *           description: The lifes of the User.
 *         points:
 *           type: integer
 *           description: The points of the User.
 *         coins:
 *           type: integer
 *           description: The coins of the User.
 *         profileImg:
 *           type: string
 *           description: The picture of the User.
 *         online:
 *           type: boolean
 *           description: The online status of the User.
 *         status:
 *           type: string
 *           description: The status of game of the User.
 *       example:
 *         id: 1
 *         username: 'My_User_Name'
 *         email: 'example@email.com'
 *         password: '123456'
 *         lifes: 5
 *         points: 0
 *         coins: 0
 *         profileImg: 'https://mypictureofmyprofile.png'
 *         online: true
 *         status: 'gaming'
 *     CreateUser:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User.
 *         password:
 *           type: string
 *           description: The password of the User.
 *         profileImg:
 *           type: object
 *           description: The picture of the User use formData.append('profileImg', file);.
 *       example:
 *         username: 'My_User_Name'
 *         email: 'example@email.com'
 *         password: '123456'
 *         profileImg:
 *     Verify:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: The code of verify recived for email.
 *       example:
 *         code: 123456
 *     UpdateUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the User.
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User.
 *         profileImg:
 *           type: object
 *           description: The picture of the User use formData.append('profileImg', file);.
 *       example:
 *         username: 'My_User_Name'
 *         email: 'example@email.com'
 *         profileImg:
 *     UpdatePasswordUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the User.
 *         password:
 *           type: string
 *           description: The password current of the User.
 *         newPassword:
 *           type: string
 *           description: The new password of the user.
 *       example:
 *         username: 'My_User_Name'
 *         password: '123456old'
 *         newPassword: '1234new'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lifes: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    profileImg: {
      type: DataTypes.STRING,
      field: "profile_img",
      defaultValue: "https://imagenes-glya.s3.amazonaws.com/user_318-875902.png"
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active"
    },
    codeVerify: {
      type: DataTypes.INTEGER,
      defaultValue: codeGenerate(),
      field: "code_verify"
    },
    isVerify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_verify"
    },
    socketId: {
      type: DataTypes.STRING,
      field: "socket_id"
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const { password } = user;
        const hash = bcrypt.hashSync(password, 8);
        user.password = hash;
      }
    }
  }
);

module.exports = User;
