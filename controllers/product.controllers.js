const ProductModel = require("../model/product.model");

class Product {
  async index(_, res) {
    let productModel = new ProductModel();
    let product = await productModel.filter();
    if (product) {
      res.json(product);
    } else {
      res.status(404).json();
    }
  }

  async show(req, res) {
    let { id } = req.params;

    if (isNaN(id)) {
      res.status(400).json();
      return;
    }

    let productModel = new ProductModel();
    let product = await productModel.findById(id);

    if (product != null) {
      res.json(product);
    } else {
      res.status(404).json();
    }
  }

  async create(req, res) {
    let { nome, preco } = req.body;

    if (!nome || !preco) {
      res.status(400).json();
      return;
    }
    let productModel = new ProductModel(nome, preco);

    let checkProductExist = await productModel.findByName(nome);

    if (checkProductExist != null) {
      res.status(400).json("Esse produto já foi cadastrado");
      return;
    }

    const product = await productModel.create(productModel);
    if (product) {
      res.json(productModel);
    } else {
      res.status(404).json();
    }
  }

  async update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;

    if (isNaN(id)) {
      res.status(400).json();
      return;
    }

    let productModel = new ProductModel(nome, preco);
    let findedProduct = await productModel.findById(id);

    if (findedProduct != null) {
      let product = await productModel.save({ id, ...productModel });
      if (product) {
        res.json({ id, ...productModel });
      } else {
        res.status(404).json();
      }
    } else {
      res.status(404).json();
    }
  }

  async destroy(req, res) {
    let { id } = req.params;

    if (isNaN(id)) {
      res.status(400).json();
      return;
    }

    let productModel = new ProductModel();
    let findedProduct = await productModel.findById(id);
    if (findedProduct != null) {
      const product = await productModel.deleteById(id);
      if (product) {
        res.json();
      } else {
        res.status(404).json();
      }
    } else {
      res.status(404).json();
    }
  }
}

let productController = new Product();

module.exports = productController;
