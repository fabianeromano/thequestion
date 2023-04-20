const axios = require("axios");
const { Advantage } = require("../models");

const getAdvantages = async () => {
  try {
    const advantages = await axios.get("https://apimocha.com/the-question/advantages");
    await Advantage.bulkCreate(advantages.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getAdvantages;
