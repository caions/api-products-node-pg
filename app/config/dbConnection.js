const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASS, DB_HOST } = require("./environment");

const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: "postgres",
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize };
