const { UserServices } = require("../services");
const uploadPhoto = require("../middlewares/uploadPhoto.middleware");
const template = require("../template/template");
const transporter = require("../utils/mailer");

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const img = req.files;
    let newImgs = "";

    if (img) {
      const newImg = await uploadPhoto(img);
      newUser.profileImg = newImg;
    }

    const result = await UserServices.createUser(newUser);
    transporter.sendMail({
      from: "<corporationglya@gmail.com>",
      to: result.email,
      subject: "Welcome to The Question",
      text: `¡Hello! ${result.username} this is your verification code: ${result.codeVerify}`,
      html: template(result)
    });

    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al crear usuario",
      errorContent: error
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await UserServices.getUserById(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener usuario",
      errorContent: error
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await UserServices.getUsers();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener usuarios",
      errorContent: error
    });
  }
};

const getTopRankedUsers = async (req, res, next) => {
  try {
    const result = await UserServices.getTopRankedUsers();
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al obtener usuarios mejor clasificados",
      errorContent: error
    });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const codeVerify = req.body;

    const result = await UserServices.verifyUser(id, codeVerify);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al verificar al usuario",
      errorContent: error
    });
  }
};

const updateOffline = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await UserServices.updateOffline(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar prop online del usuario",
      errorContent: error
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.body;

    const result = await UserServices.updateUser(id, user);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al actualizar usuario",
      errorContent: error
    });
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const credentials = req.body;

    const result = await UserServices.updateUserPassword(id, credentials);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al eliminar usuario",
      errorContent: error
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await UserServices.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      message: "Error al eliminar usuario",
      errorContent: error
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  getTopRankedUsers,
  verifyUser,
  updateOffline,
  updateUser,
  updateUserPassword,
  deleteUser
};
