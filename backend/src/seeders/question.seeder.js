const axios = require("axios");
const { Question } = require("../models");

const getQuestions = async () => {
  try {
    const questions = await axios.get("https://apimocha.com/the-question/questions");
    await Question.bulkCreate(questions.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getQuestions;
