const { Op } = require("sequelize");
const Product = require("./entities/Product");
const User = require("./entities/User");

class ProductModel {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
    this.created_at;
    this.updated_at;
  }

  async filter({ nome, preco }) {
    let options = {};

    if (nome) {
      options.nome = {
        [Op.like]: `%${nome}%`,
      };
    }

    if (preco) {
      options.preco = preco;
    }
    try {
      let result = await Product.findAll({
        where: options,
        order: ["id"],
        include: User,
      }); // include user
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async findById(id) {
    try {
      const result = await Product.findByPk(id, { include: User }); // include user
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async findByName(name) {
    try {
      const result = await Product.findOne({ where: { nome: name } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async create(product) {
    let { nome, preco } = product;
    try {
      const result = await Product.create({ nome, preco });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async save(product) {
    let { nome, preco, id } = product;
    try {
      const result = await Product.update({ nome, preco }, { where: { id } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async deleteById(id) {
    try {
      const result = await Product.destroy({ where: { id } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }
}

module.exports = ProductModel;
