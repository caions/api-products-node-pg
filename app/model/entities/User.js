const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnection");

const User = sequelize.define("users", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
