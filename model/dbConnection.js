const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  database: "postgres",
  username: "postgres",
  password: "postgres",
  dialect: "postgres",
  host: "172.17.0.2",
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
