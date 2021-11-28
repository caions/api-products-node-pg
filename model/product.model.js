const pool = require("../model/dbConnection");

class ProductModel {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
    this.createAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  async filter() {
    let selectQuery = "SELECT * FROM PRODUCTS ORDER BY ID";
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

  async findByName(name) {
    let selectQuery = `SELECT * FROM PRODUCTS WHERE NOME = '${name}'`;
    try {
      const result = await pool.query(selectQuery);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async create(product) {
    let { nome, preco } = product;
    let insertQuery = `INSERT INTO products(nome,preco,created_at,updated_at) VALUES('${nome}',${preco},'${this.createAt}','${this.updatedAt}')`;
    try {
      const result = await pool.query(insertQuery);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async save(product) {
    let { nome, preco, id } = product;
    let updateQuery = `UPDATE products SET nome='${nome}', preco=${preco},updated_at='${this.updatedAt}' WHERE id=${id}`;

    try {
      const result = await pool.query(updateQuery);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
  }

  async deleteById(id) {
    let dropQuery = `DELETE FROM products WHERE id = ${id};`;

    try {
      const result = await pool.query(dropQuery);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ProductModel;
