const product = require("../model/product.model");

class Product {
  getAll(_, res) {
    const result = (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(rows);
        return;
      }
      res.status(404).json(data);
    };
    product.getAll(result);
  }

  getOne(req, res) {
    let { id } = req.params;
    product.getOne(id, (data) => {
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
    const result = (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(rows);
        return;
      }
      res.status(404).json(data);
    };

    product.create(nome, preco, result);
  }

  update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;
    let request = { id, nome, preco };
    const result = (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(req.body);
        return;
      }
      res.status(404).json(data);
    };

    product.update(request, result);
  }

  delete(req, res) {
    let { id } = req.params;
    let request = { id };

    const result = (data) => {
      if (data) {
        res.json();
        return;
      }
      res.status(404).json(data);
    };

    product.delete(request, result);
  }
}

let productController = new Product();

module.exports = productController;
