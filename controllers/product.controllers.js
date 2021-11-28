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

    if (product.rowCount != 0) {
      res.json(product.rows);
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
    console.log(productModel)

    let checkProductExist = await productModel.findByName(nome);

    if (checkProductExist.rowCount != 0) {
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

    let productModel = new ProductModel(nome, preco);
    let { rows } = await productModel.findById(id);

    if (rows != "") {
      let product = await productModel.save(rows[0]);
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
    let productModel = new ProductModel();
    let { rows } = await productModel.findById(id);
    if (rows != "") {
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
