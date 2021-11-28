const ProductModel = require("../model/product.model");

class Product {
  index(_, res) {
    let product = new ProductModel();

    product.filter((data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(rows);
        return;
      }
      res.status(404).json(data);
    });
  }

  show(req, res) {
    let { id } = req.params;
    let product = new ProductModel();
    product.findById(id, (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(rows);
        return;
      }
      res.status(404).json(data);
    });
  }

  create(req, res) {
    let { nome, preco } = req.body;

    let product = new ProductModel(nome, preco);
    product.create(product, (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(rows);
        return;
      }
      res.status(404).json(data);
    });
  }

  update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;

    let product = new ProductModel(nome, preco);
    product.save({ id, ...product }, (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(req.body);
        return;
      }
      res.status(404).json(data);
    });
  }

  destroy(req, res) {
    let { id } = req.params;
    let product = new ProductModel();
    product.deleteById(id, (data) => {
      if (data) {
        res.json();
        return;
      }
      res.status(404).json(data);
    });
  }
}

let productController = new Product();

module.exports = productController;
