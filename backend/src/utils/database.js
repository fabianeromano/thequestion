const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: "postgres",
  logging: false
});

module.exports = db;
