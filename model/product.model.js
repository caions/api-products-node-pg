const pool = require("../model/dbConnection");

class Product {
  id;
  nome;
  preco;
  constructor(id, nome, preco) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  getAll(result) {
    let selectQuery = "SELECT * FROM PRODUCTS";
    pool.query(selectQuery, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  getOne(id, result) {
    let selectQuery = `SELECT * FROM PRODUCTS WHERE ID = ${id}`;
    pool.query(selectQuery, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  create(nome, preco, result) {
    let insertQuery = `insert into products(nome,preco) values('${nome}',${preco})`;
    pool.query(insertQuery, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  update(request, result) {
    let { nome, preco, id } = request;
    let queryUpdate = `UPDATE products SET nome='${nome}', preco=${preco} WHERE id=${id}`;

    pool.query(queryUpdate, (err, data) => {
      if (err) {
        result(err);
        return;
      }
      result(data);
    });
  }

  delete(request, result) {
    let { id } = request;
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

let product = new Product();

module.exports = product;
