const ProductModel = require("../model/product.model");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

class Product {
  async auth(req, res) {
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, "token-secreto", {
      expiresIn: 300, // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }

  async index(req, res) {
    let { nome, preco } = req.query;
    let filter = {};

    if (nome) {
      filter.nome = nome;
    }

    if (!isNaN(preco)) {
      filter.preco = preco;
    }

    let productModel = new ProductModel();
    let product = await productModel.filter(filter);

    res.json(product);
  }

  async show(req, res) {
    let { id } = req.params;

    let productModel = new ProductModel();
    let product = await productModel.findById(id);

    if (!product) {
      throw new ApiError(404, "Produto não encontrado");
    }

    res.json(product);
  }

  async create(req, res) {
    let { nome, preco } = req.body;

    if (!nome || !preco) {
      throw new ApiError(400, "Informe o nome e preco do produto");
    }

    let productModel = new ProductModel(nome, preco);

    let checkProductExists = await productModel.findByName(nome);
    if (checkProductExists) {
      throw new ApiError(400, "Esse nome de produto está indisponível");
    }

    const product = await productModel.create(productModel);

    res.json(product);
  }

  async update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;

    let productModel = new ProductModel(nome, preco);

    let checkProductExists = await productModel.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    let checkProductNameAlreadyExists = await productModel.findByName(nome);
    if (checkProductNameAlreadyExists) {
      throw new ApiError(400, "Esse nome de produto está indisponível");
    }

    await productModel.save({ id, ...productModel });

    res.json({ id, ...productModel });
  }

  async destroy(req, res) {
    let { id } = req.params;

    let productModel = new ProductModel();

    let checkProductExists = await productModel.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    await productModel.deleteById(id);
    res.json();
  }
}

let productController = new Product();

module.exports = productController;
