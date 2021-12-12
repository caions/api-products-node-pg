const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "postgres",
  username: "postgres",
  password: "postgres",
  dialect: "postgres",
  host: "172.17.0.2",
  logging: false,
});

sequelize.sync();

module.exports = sequelize;
