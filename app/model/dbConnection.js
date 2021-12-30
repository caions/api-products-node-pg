const { Sequelize, DataTypes } = require("sequelize");
const { DB_USER, DB_PASS, DB_HOST } = require("../config/environment");

const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: "postgres",
  dialect: "postgres",
  logging: false,
});

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

// one to many relationship
//User.hasMany(Product);
//Product.belongsTo(User);

// many to many relationship
User.belongsToMany(Product, { through: "UserProducts" });
Product.belongsToMany(User, { through: "UserProducts" });

sequelize.sync();

module.exports = { sequelize, User, Product };
