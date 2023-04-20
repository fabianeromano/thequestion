const { User } = require("../models");
const { AuthServices } = require("../services");

const userLogin = async (req, res, next) => {
  try {
    const credentials = req.body;

    const { userFound } = await AuthServices.authenticate(credentials);
    const { email, password, id, username, profileImg } = userFound;

    const token = AuthServices.generateToken({ email, password, id });
    await User.update({ online: true }, { where: { id } });

    const user = {
      id,
      username,
      email,
      profileImg
    };

    res.status(200).json({ ...user, ...token });
  } catch (error) {
    next({
      status: 400,
      message: "Error login",
      errorContent: error
    });
  }
};

module.exports = { userLogin };
