const { UserFriendServices } = require("../services");

const addUserFriend = async (req, res, next) => {
  try {
    const body = req.body;

    const result = await UserFriendServices.addUserFriend(body);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al añadir amigo",
      errorContent: error
    });
  }
};

const getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.params;
    const path = req.route.path.split("/");
    const status = path[path.length - 1];

    const result = await UserFriendServices.getUserFriends(id, status);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener amigos",
      errorContent: error
    });
  }
};

const acceptFriend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const result = await UserFriendServices.acceptFriend(id, body);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al aceptar amigo",
      errorContent: error
    });
  }
};

const deleteFriend = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await UserFriendServices.deleteFriend(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al eliminar amigo",
      errorContent: error
    });
  }
};

module.exports = {
  addUserFriend,
  getUserFriends,
  acceptFriend,
  deleteFriend
};
