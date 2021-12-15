const UserModel = require("../model/user.model");
const ProductModel = require("../model/product.model");
const ApiError = require("../utils/apiError");

class User {
  async index(req, res) {
    let { nome, idade } = req.query;
    let filter = {};

    if (nome) {
      filter.nome = nome;
    }

    if (!isNaN(idade)) {
      filter.idade = idade;
    }

    let userModel = new UserModel();
    let user = await userModel.filter(filter);

    res.json(user);
  }

  async show(req, res) {
    let { id } = req.params;

    let userModel = new UserModel();
    let user = await userModel.findById(id);

    if (!user) {
      throw new ApiError(404, "usuário não encontrado");
    }

    res.json(user);
  }

  async create(req, res) {
    let { nome, idade } = req.body;

    if (!nome || !idade) {
      throw new ApiError(400, "Informe o nome e idade do usuário");
    }

    let userModel = new UserModel(nome, idade);

    let checkUserExists = await userModel.findByName(nome);
    if (checkUserExists) {
      throw new ApiError(400, "Esse nome de usuário está indisponível");
    }

    const user = await userModel.create(userModel);

    res.json(user);
  }

  async update(req, res) {
    let { nome, idade } = req.body;
    let { id } = req.params;

    let userModel = new UserModel(nome, idade);

    let checkUserExists = await userModel.findById(id);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    let checkUserNameAlreadyExists = await userModel.findByName(nome);
    if (checkUserNameAlreadyExists) {
      throw new ApiError(400, "Esse nome de usuário está indisponível");
    }

    await userModel.save({ id, ...userModel });

    res.json({ id, ...userModel });
  }

  async destroy(req, res) {
    let { id } = req.params;

    let userModel = new UserModel();

    let checkUserExists = await userModel.findById(id);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    await userModel.deleteById(id);
    res.json();
  }

  async addProduct(req, res) {
    const { userId, productId } = req.body;

    let userModel = new UserModel();
    let productModel = new ProductModel();

    let checkUserExists = await userModel.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await productModel.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await userModel.addProduct(userId, productId);
    res.json(result);
  }

  async removeProduct(req, res) {
    const { userId, productId } = req.body;

    let userModel = new UserModel();
    let productModel = new ProductModel();

    let checkUserExists = await userModel.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await productModel.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await userModel.removeProduct(userId, productId);
    res.json(result);
  }
}

let userController = new User();

module.exports = userController;
