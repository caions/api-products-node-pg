const { Op } = require("sequelize");
const { User, Product } = require("./dbConnection");
class UserModel {
  constructor(nome, email, password) {
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.created_at;
    this.updated_at;
  }

  async filter({ nome, email }) {
    let options = {};

    if (nome) {
      options.nome = {
        [Op.like]: `%${nome}%`,
      };
    }

    if (email) {
      options.email = {
        [Op.like]: `%${email}%`,
      };
    }

    try {
      let result = await User.findAll({
        where: options,
        order: [["id", "ASC"]],
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: {
          model: Product,
          through: { attributes: [] },
        },
      }); // include products
      return result;
    } catch (err) {
      console.log({ sql: err.sql, message: err.message });
      throw new Error();
    }
  }

  async findById(id) {
    try {
      const result = await User.findByPk(id, {
        order: [["id", "ASC"]],
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: {
          model: Product,
          attributes: ["id", "nome", "preco"],
          through: { attributes: [] },
        },
      }); // include products
      return result;
    } catch (err) {
      console.log({ sql: err.sql, message: err.message });
      throw new Error();
    }
  }

  async findByEmail(email) {
    try {
      const result = await User.findOne({ where: { email } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async findByName(name) {
    try {
      const result = await User.findOne({ where: { nome: name } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async create(user) {
    let { nome, email, password } = user;
    try {
      const result = await User.create({ nome, email, password });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async save(user) {
    let { nome, password, id } = user;
    try {
      const result = await User.update({ nome, password }, { where: { id } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async deleteById(id) {
    try {
      const result = await User.destroy({ where: { id } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async addProduct(userId, productId) {
    try {
      const user = await User.findByPk(userId);
      const product = await Product.findByPk(productId);
      const result = await user.addProduct(product);
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }

  async removeProduct(userId, productId) {
    try {
      const user = await User.findByPk(userId);
      const product = await Product.findByPk(productId);
      const result = await user.removeProduct(product);
      return result;
    } catch (err) {
      console.log(err.stack);
      throw new Error();
    }
  }
}

module.exports = UserModel;
