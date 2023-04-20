const { Question } = require("../models");

const getRandomQuestionsQuestions = async count => {
  const questions = await Question.findAll();
  const result = [];

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomObject = questions[randomIndex];

    if (!result.includes(randomObject)) {
      result.push(randomObject);
    }
  }

  return result;
};

module.exports = getRandomQuestionsQuestions;
