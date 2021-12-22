require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index");
const handlerError = require("./utils/handleError");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

// handler errors of aplication
app.use(handlerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
