const { Achievement, User } = require("../models");

class AchievementServices {
  static async getAchievements() {
    try {
      const achievements = await Achievement.findAll();
      return achievements;
    } catch (error) {
      throw error;
    }
  }
  static async getUserUnlockedAchievements(id) {
    try {
      const userUnlockedAchievements = await User.findByPk(id, {
        attributes: ["username"],
        include: {
          model: Achievement,
          as: "achievements",
          through: {
            attributes: []
          }
        }
      });

      return userUnlockedAchievements || { message: "There is no user with that id" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AchievementServices;
