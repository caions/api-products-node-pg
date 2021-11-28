const ProductModel = require("../model/product.model");

class Product {
  async index(_, res) {
    let productModel = new ProductModel();
    let product = await productModel.filter();
    if (product) {
      res.json(product.rows);
    } else {
      res.status(404).json();
    }
  }

  async show(req, res) {
    let { id } = req.params;
    let productModel = new ProductModel();
    let product = await productModel.findById(id);
    if (product) {
      res.json(product.rows);
    } else {
      res.status(404).json();
    }
  }

  async create(req, res) {
    let { nome, preco } = req.body;

    let productModel = new ProductModel(nome, preco);
    const product = await productModel.create(productModel);
    if (product) {
      res.json(req.body);
    } else {
      res.status(404).json();
    }
  }

  async update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;

    let productModel = new ProductModel(nome, preco);
    let product = await productModel.save({ id, ...productModel });
    if (product) {
      res.json({ id, ...productModel });
    } else {
      res.status(404).json();
    }
  }

  async destroy(req, res) {
    let { id } = req.params;
    let productModel = new ProductModel();
    const product = await productModel.deleteById(id);
    if (product) {
      res.json();
    } else {
      res.status(404).json();
    }
  }
}

let productController = new Product();

module.exports = productController;
