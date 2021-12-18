const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  database: "postgres",
  username: "postgres",
  password: "postgres",
  dialect: "postgres",
  host: "172.17.0.2",
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
