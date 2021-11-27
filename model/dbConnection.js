const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "praticar",
  password: "postgres",
  port: 5432,
  host: "localhost",
});

pool.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco");
  }
});

module.exports = pool;
