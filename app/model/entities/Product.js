const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnection");

const Product = sequelize.define("products", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Product;
