const axios = require("axios");
const { Topic } = require("../models");

const getTopics = async () => {
  try {
    const topics = await axios.get("https://apimocha.com/the-question/topics");
    await Topic.bulkCreate(topics.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getTopics;
