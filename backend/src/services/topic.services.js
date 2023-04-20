const { Topic, User, User_Topic } = require("../models");

class TopicServices {
  static async getTopics() {
    try {
      const result = await Topic.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getUserTopics(id) {
    try {
      if (isNaN(parseInt(id))) throw "Id param must be an integer";

      const result = await User.findByPk(id, {
        attributes: [],
        include: { model: Topic, as: "topics", through: { attributes: [] } }
      });
      if (result === null) throw "User not found";

      const { topics } = result;
      return topics;
    } catch (error) {
      throw error;
    }
  }
  static async addUserTopic(id, topicId) {
    try {
      if (!topicId) throw "There is no topic to add";
      if (isNaN(parseInt(id)) || isNaN(parseInt(topicId)))
        throw "Both id param and topicId body param must be integers";

      const [result, created] = await User_Topic.findOrCreate({
        where: { userId: id, topicId }
      });
      if (!created) throw "User's topic already added";

      return { message: "Topic added successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserTopic(id, topicId) {
    try {
      if (!topicId) throw "There is no topic to delete";
      if (isNaN(parseInt(id)) || isNaN(parseInt(topicId)))
        throw "Both id param and topicId body param must be integers";

      const userTopicDeleted = await User_Topic.destroy({ where: { userId: id, topicId } });
      if (userTopicDeleted === 0) throw "User's topic already deleted";

      return { message: "Topic deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TopicServices;
