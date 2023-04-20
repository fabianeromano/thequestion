const { News, Topic, User } = require("../models");
const { Op } = require("sequelize");

class NewsServices {
  static async getNews() {
    try {
      const result = await News.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getNewsByUserTopics(id) {
    try {
      if (isNaN(parseInt(id))) throw "Id param must be an integer";

      const userTopics = await User.findByPk(id, {
        attributes: [],
        include: {
          model: Topic,
          as: "topics",
          attributes: ["id"],
          through: {
            attributes: []
          }
        }
      });
      if (userTopics === null) throw "User not found";

      const { topics } = userTopics.dataValues;
      const topicIds = topics.map(topic => topic.id);

      const news = await News.findAll({
        where: {
          topicId: {
            [Op.and]: [topicIds]
          }
        },
        attributes: ["title", "summary", "img", "link"],
        include: { model: Topic, attributes: ["name"] }
      });
      return news;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = NewsServices;
