const { User, Product } = require("../model/dbConnection");

class UserModel {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
    this.created_at;
    this.updated_at;
  }

  async filter() {
    try {
      let result = await User.findAll({ order: ["id"], include: Product }); // include products
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findById(id) {
    try {
      const result = await User.findByPk(id, { include: Product }); // include products
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findByName(name) {
    try {
      const result = await User.findOne({ where: { nome: name } });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async create(user) {
    let { nome, idade } = user;
    try {
      const result = await User.create({ nome, idade });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async save(user) {
    let { nome, idade, id } = user;
    try {
      const result = await User.update({ nome, idade }, { where: { id } });
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async deleteById(id) {
    try {
      const result = await User.destroy({ where: { id } });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserModel;
