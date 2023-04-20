const axios = require("axios");
const { User } = require("../models");

const getUsers = async () => {
  try {
    const { data } = await axios.get("https://apimocha.com/the-question/users");
    await data.forEach(user => User.create(user));
  } catch (error) {
    console.error(error);
  }
};

module.exports = getUsers;
