const ProductModel = require("../model/product.model");
const ApiError = require("../utils/apiError");

class Product {
  async index(_, res) {
    let productModel = new ProductModel();
    let product = await productModel.filter();

    if (product) {
      res.json(product);
    } else {
      throw new ApiError(404, "produto não encontrado");
    }
  }

  async show(req, res, next) {
    let { id } = req.params;

    if (isNaN(id)) {
      throw new ApiError(400, "Informe o id do produto");
    }

    let productModel = new ProductModel();
    let product = await productModel.findById(id);

    if (product != null) {
      res.json(product);
    } else {
      throw new ApiError(404, "produto não encontrado");
    }
  }

  async create(req, res) {
    let { nome, preco } = req.body;

    if (!nome || !preco) {
      throw new ApiError(400, "Informe o nome e preco do produto");
    }

    let productModel = new ProductModel(nome, preco);

    let checkProductExist = await productModel.findByName(nome);

    if (checkProductExist != null) {
      throw new ApiError(400, "Esse produto já foi cadastrado");
    }

    const product = await productModel.create(productModel);
    if (product) {
      res.json(product);
    } else {
      throw new ApiError(404, "produto não encontrado");
    }
  }

  async update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;

    if (isNaN(id)) {
      throw new ApiError(400, "Informe o id do produto");
    }

    let productModel = new ProductModel(nome, preco);
    let foundProduct = await productModel.findById(id);

    if (foundProduct != null) {
      let product = await productModel.save({ id, ...productModel });
      if (product) {
        res.json({ id, ...productModel });
      } else {
        throw new ApiError(404, "produto não encontrado");
      }
    } else {
      throw new ApiError(404, "produto não encontrado");
    }
  }

  async destroy(req, res) {
    let { id } = req.params;

    if (isNaN(id)) {
      throw new ApiError(400, "Informe o id do produto");
    }

    let productModel = new ProductModel();
    let foundProduct = await productModel.findById(id);
    if (foundProduct != null) {
      const product = await productModel.deleteById(id);
      if (product) {
        res.json();
      } else {
        throw new ApiError(404, "produto não encontrado");
      }
    } else {
      throw new ApiError(404, "produto não encontrado");
    }
  }
}

let productController = new Product();

module.exports = productController;
