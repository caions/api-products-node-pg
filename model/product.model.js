const pool = require("../model/dbConnection");

class ProductModel {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  filter(result) {
    let selectQuery = "SELECT * FROM PRODUCTS";
    pool.query(selectQuery, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  findById(id, result) {
    let selectQuery = `SELECT * FROM PRODUCTS WHERE ID = ${id}`;
    pool.query(selectQuery, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  create(product, result) {
    let { nome, preco } = product;
    let insertQuery = `insert into products(nome,preco) values('${nome}',${preco})`;
    pool.query(insertQuery, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  save(product, result) {
    let { nome, preco, id } = product;
    let queryUpdate = `UPDATE products SET nome='${nome}', preco=${preco} WHERE id=${id}`;

    pool.query(queryUpdate, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  deleteById(id, result) {

    let queryDrop = `DELETE FROM products WHERE id = ${id};`;
    pool.query(queryDrop, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }
}

module.exports = ProductModel;
