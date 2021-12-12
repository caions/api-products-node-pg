const { DataTypes } = require("sequelize");
const sequelize = require("./dbConnection");

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

class ProductModel {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
    this.created_at;
    this.updated_at;
  }

  async filter() {
    try {
      let result = await Product.findAll({ order: ["id"] });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findById(id) {
    try {
      const result = await Product.findByPk(id);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findByName(name) {
    try {
      const result = await Product.findOne({ where: { nome: name } });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async create(product) {
    let { nome, preco } = product;
    try {
      const result = await Product.create({ nome, preco });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async save(product) {
    let { nome, preco, id } = product;
    try {
      const result = await Product.update({ nome, preco }, { where: { id } });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async deleteById(id) {
    try {
      const result = await Product.destroy({ where: { id } });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ProductModel;
