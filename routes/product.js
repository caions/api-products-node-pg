const express = require("express");
const pool = require("../dbConnection");
const route = express.Router();

route.get("/", (req, res) => {
  let selectQuery = "SELECT * FROM PRODUCTS";
  pool.query(selectQuery, (err, { rows }) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(rows);
    }
  });
});

route.post("/", (req, res) => {
  let nome = req.body.nome;
  let preco = req.body.preco;
  let insertQuery = `insert into products(nome,preco) values('${nome}',${preco})`;
  pool.query(insertQuery, (err, rows) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let nome = req.body;
      res.json(nome);
    }
  });
});

route.put("/", (req, res) => {
  let queryUpdate = "UPDATE products SET nome='ps5' WHERE id=2";
  pool.query(queryUpdate, (err, rows) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let nome = req.body;
      res.json(nome);
    }
  });
});

route.delete("/", (req, res) => {
  let queryDrop = "DELETE FROM products WHERE id = 1;";
  pool.query(queryDrop, (err, rows) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let nome = req.body;
      res.json(nome);
    }
  });
});

module.exports = route;
