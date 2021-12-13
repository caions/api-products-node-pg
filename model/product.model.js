const { Product, User } = require("../model/dbConnection");

class ProductModel {
  constructor(nome, preco, userId) {
    this.nome = nome;
    this.preco = preco;
    this.userId = userId;
    this.created_at;
    this.updated_at;
  }

  async filter() {
    try {
      let result = await Product.findAll({ order: ["id"], include: User }); // include user
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findById(id) {
    try {
      const result = await Product.findByPk(id, { include: User }); // include user
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
    let { nome, preco, userId } = product;
    try {
      const result = await Product.create({ nome, preco, userId });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async save(product) {
    let { nome, preco, id, userId } = product;
    try {
      const result = await Product.update(
        { nome, preco, userId },
        { where: { id } }
      );
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
      console.log(err.stack);
    }
  }
}

module.exports = ProductModel;
