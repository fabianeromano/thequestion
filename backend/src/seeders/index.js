const db = require("../utils/database");
const initModels = require("../models/initModels");
const getAchievements = require("./achievement.seeder");
const getAdvantages = require("./advantage.seeder");
const getNews = require("./news.seeder");
const getQuestions = require("./question.seeder");
const getTopics = require("./topic.seeder");
const getUsers = require("./user.seeder");

initModels();

db.sync({ force: true })
  .then(() => {
    console.log("Populating the database with an initial set of data...");
    getAchievements();
    getAdvantages();
    getTopics()
      .then(() => {
        getNews();
        getQuestions();
      })
      .then(() =>
        console.log(
          "The database has been populated successfully! Please, wait a few more seconds until the operation ends."
        )
      );
    getUsers();
  })
  .catch(error => console.error("Unable to populate the database: ", error));
