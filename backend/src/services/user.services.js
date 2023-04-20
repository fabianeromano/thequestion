const { User, Advantage, User_Advantage } = require("../models");
const { Op } = require("sequelize");
const AuthServices = require("./auth.services");

class UserServices {
  static async createUser(user) {
    try {
      const result = await User.create(user);
      const advantages = [
        { quantity: 2, userId: result.id, advantageId: 1 },
        { quantity: 2, userId: result.id, advantageId: 2 }
      ];
      await User_Advantage.bulkCreate(advantages)
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(id) {
    try {
      const result = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "codeVerify"]
        },
        include: {
          model: Advantage,
          as: "advantages"
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUsers() {
    try {
      const result = await User.findAll({
        where: { isVerify: true },
        attributes: {
          exclude: ["password", "codeVerify"]
        },
        order: [["id", "ASC"]]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getTopRankedUsers() {
    try {
      const result = await User.findAll({
        where: { points: { [Op.gt]: 0 } },
        order: [["points", "DESC"]]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async verifyUser(id, { code }) {
    try {
      const { codeVerify } = await User.findByPk(id);
      if (code !== codeVerify) throw "Incorrect verification code";

      await User.update({ isVerify: true }, { where: { id } });

      return { message: "User verified" };
    } catch (error) {
      throw error;
    }
  }
  static async updateOffline(id) {
    try {
      await User.update({ online: false }, { where: { id } });

      return { message: "User Online updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async updateUser(id, body) {
    try {
      await User.update(body, { where: { id } });

      return { message: "User updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async updateUserPassword(id, credentials) {
    try {
      const { getUser } = AuthServices.authenticate(credentials);
      const hash = bcrypt.hashSync(credentials.newPassword, 8);

      await User.update({ password: hash }, { where: { id: getUser.id } });

      return { message: "User Password updated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async deleteUser(id) {
    try {
      await User.destroy({ where: { id } });

      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
