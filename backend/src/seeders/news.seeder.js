const axios = require("axios");
const { News } = require("../models");

const getNews = async () => {
  try {
    const news = await axios.get("https://apimocha.com/the-question/news");
    await News.bulkCreate(news.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getNews;
