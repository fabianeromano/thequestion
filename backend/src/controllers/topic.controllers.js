const { TopicServices } = require("../services");

const getTopics = async (req, res, next) => {
  try {
    const result = await TopicServices.getTopics();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener tópicos",
      errorContent: error
    });
  }
};

const getUserTopics = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await TopicServices.getUserTopics(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener tópicos",
      errorContent: error
    });
  }
};

const addUserTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topicId } = req.body;

    const result = await TopicServices.addUserTopic(id, topicId);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al añadir tópico al usuario",
      errorContent: error
    });
  }
};

const deleteUserTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topicId } = req.body;

    const result = await TopicServices.deleteUserTopic(id, topicId);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al añadir tópico al usuario",
      errorContent: error
    });
  }
};

module.exports = { getTopics, getUserTopics, addUserTopic, deleteUserTopic };
