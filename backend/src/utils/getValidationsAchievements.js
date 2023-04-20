const { User_Achievement } = require("../models");

const getValidationsAchievements = async (valor, promisesAll, userId) => {
  let coins = 0;

  if (valor >= 5) {
    if (!promisesAll.find(item => (item = { achievementId: 7, userId }))) {
      await User_Achievement.create({ userId, achievementId: 7 });
      coins = 50;
    }
  }

  if (valor >= 10) {
    if (!promisesAll.find(item => (item = { achievementId: 8, userId }))) {
      await User_Achievement.create({ userId, achievementId: 8 });
      coins = 100;
    }
  }

  if (valor >= 15) {
    if (!promisesAll.find(item => (item = { achievementId: 9, userId }))) {
      await User_Achievement.create({ userId, achievementId: 9 });
      coins = 150;
    }
  }

  if (valor >= 20) {
    if (!promisesAll.find(item => (item = { achievementId: 10, userId }))) {
      await User_Achievement.create({ userId, achievementId: 10 });
      coins = 200;
    }
  }

  return coins;
};

module.exports = getValidationsAchievements;
