const pool = require("../model/dbConnection");

class ProductModel {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  async filter() {
    let selectQuery = "SELECT * FROM PRODUCTS";
    try {
      const result = await pool.query(selectQuery);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async findById(id) {
    let selectQuery = `SELECT * FROM PRODUCTS WHERE ID = ${id}`;
    try {
      const result = await pool.query(selectQuery);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async create(product) {
    let { nome, preco } = product;
    let insertQuery = `insert into products(nome,preco) values('${nome}',${preco})`;
    try {
      const result = await pool.query(insertQuery);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async save(product) {
    let { nome, preco, id } = product;
    let queryUpdate = `UPDATE products SET nome='${nome}', preco=${preco} WHERE id=${id}`;

    try {
      const result = await pool.query(queryUpdate);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async deleteById(id) {
    let queryDrop = `DELETE FROM products WHERE id = ${id};`;

    try {
      const result = await pool.query(queryDrop);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ProductModel;
