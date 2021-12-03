const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  database: "praticar",
  username: "postgres",
  password: "postgres",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

const Product = sequelize.define(
  "products",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
