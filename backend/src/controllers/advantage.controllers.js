const { AdvantageServices } = require("../services");

const getAdvantages = async (req, res, next) => {
  try {
    const advantages = await AdvantageServices.getAdvantages();
    res.status(200).json(advantages);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener ventajas",
      errorContent: error
    });
  }
};

const buyUserAdvantages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const userAdvantages = await AdvantageServices.buyUserAdvantages(id, body);
    res.status(200).json(userAdvantages);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar ventajas de usuario",
      errorContent: error
    });
  }
};

const addUserAdvantage = async (req, res, next) => {
  try {
    const body = req.body;

    const userAdvantages = await AdvantageServices.addUserAdvantage(body);
    res.status(200).json(userAdvantages);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar ventajas de usuario",
      errorContent: error
    });
  }
};

module.exports = { getAdvantages, buyUserAdvantages, addUserAdvantage };
