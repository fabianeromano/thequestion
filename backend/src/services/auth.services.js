const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthServices {
  static async authenticate(credentials) {
    try {
      const { username, password, socketId } = credentials;

      const userFound = await User.findOne({
        where: { username }
      });
      if (!userFound) throw "User not found";

      const isValid = bcrypt.compareSync(password, userFound.password);
      if (!isValid) throw "Incorrect password";

      await User.update({ socketId }, { where: { id: userFound.id } });

      return { isValid, userFound };
    } catch (error) {
      throw error;
    }
  }
  static generateToken(data) {
    try {
      const token = jwt.sign(data, process.env.SECRET_KEY, {
        algorithm: "HS512"
      });
      return { token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
