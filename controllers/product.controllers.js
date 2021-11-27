const product = require("../model/product.model");

class Product {
  getAll(req, res) {
    const result = ({ rows }) => {
      res.status(200).json(rows);
    };
    const error = (erro) => {
      console.log(erro);
      res.status(404).json(erro);
    };
    product.getAll(result, error);
  }

  getOne(req, res) {
    let { id } = req.params;
    product.getOne(id, (data) => {
      let { rows } = data;
      if (rows) {
        res.status(200).json(rows);
      } else {
        res.status(404).json(data);
      }
    });
  }

  create(req, res) {
    let { nome, preco } = req.body;
    const result = ({ rows }) => {
      res.status(200).json(rows);
    };
    const error = (erro) => {
      console.log(erro);
      res.status(404).json(erro);
    };
    product.create(nome, preco, result, error);
  }

  update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;
    let request = { id, nome, preco };
    const result = () => {
      res.status(200).json();
    };
    const error = (erro) => {
      console.log(erro);
      res.status(404).json(erro);
    };
    product.update(request, result, error);
  }

  delete(req, res) {
    let { id } = req.params;
    let request = { id };

    product.delete(
      request,
      () => res.json(),
      (e) => {
        console.log(e);
        res.status(404).json(e);
      }
    );
  }
}

let productController = new Product();

module.exports = productController;
