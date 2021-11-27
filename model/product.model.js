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

  getAll(result, error) {
    let selectQuery = "SELECT * FROM PRODUCTS";
    pool.query(selectQuery, (err, rows) => {
      if (err) {
        error(err);
        return;
      }
      result(rows);
    });
  }

  getOne(id, result) {
    let selectQuery = `SELECT * FROM PRODCTS WHERE ID = ${id}`;
    pool.query(selectQuery, (err, rows) => {
      if (err) {
        result(err);
        return;
      }
      result(rows);
    });
  }

  create(nome, preco, result, error) {
    let insertQuery = `insert into products(nome,preco) values('${nome}',${preco})`;
    pool.query(insertQuery, (err, rows) => {
      if (err) {
        error(err);
        return;
      }
      result(rows);
    });
  }

  update(request, result, error) {
    let { nome, preco, id } = request;
    let queryUpdate = `UPDATE products SET nome='${nome}', preco=${preco} WHERE id=${id}`;

    pool.query(queryUpdate, (err, rows) => {
      if (err) {
        error(err);
        return;
      }
      result();
    });
  }

  delete(request, result, error) {
    let { id } = request;
    let queryDrop = `DELETE FROM products WHERE id = ${id};`;
    pool.query(queryDrop, (err, rows) => {
      if (err) {
        error(err);
        return;
      }
      result();
    });
  }
}

let product = new Product();

module.exports = product;
