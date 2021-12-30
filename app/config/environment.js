const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "..", "..", `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_USER: process.env.PGUSER,
  DB_PASS: process.env.PGPASSWORD,
  DB_HOST: process.env.PGHOST,
  PORT: process.env.PORT || 3001,
  SECRET_TOKEN_KEY: process.env.SECRET_TOKEN_KEY,
};
