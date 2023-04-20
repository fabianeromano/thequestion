const { AchievementServices } = require("../services");

const getAchievements = async (req, res, next) => {
  try {
    const achievements = await AchievementServices.getAchievements();
    res.status(200).json(achievements);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener logros",
      errorContent: error
    });
  }
};

const getUserUnlockedAchievements = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userUnlockedAchievements = await AchievementServices.getUserUnlockedAchievements(id);
    res.status(200).json(userUnlockedAchievements);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener logros desbloqueados de usuario",
      errorContent: error
    });
  }
};

module.exports = { getAchievements, getUserUnlockedAchievements };
