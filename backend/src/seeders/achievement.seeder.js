const axios = require("axios");
const { Achievement } = require("../models");

const getAchievements = async () => {
  try {
    const achievements = await axios.get("https://apimocha.com/the-question/achievements");
    await Achievement.bulkCreate(achievements.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getAchievements;
