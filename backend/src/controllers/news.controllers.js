const { NewsServices } = require("../services");

const getNews = async (req, res, next) => {
  try {
    const result = await NewsServices.getNews();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener noticias",
      errorContent: error
    });
  }
};

const getNewsByUserTopics = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await NewsServices.getNewsByUserTopics(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener noticias por tópicos de usuario",
      errorContent: error
    });
  }
};

module.exports = { getNews, getNewsByUserTopics };
