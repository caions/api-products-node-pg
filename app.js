require("express-async-errors");
require("./model/dbConnection");
const express = require("express");
const app = express();
const routeProduct = require("./routes/product");
const handlerError = require("./utils/handleError");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routeProduct);

// handler errors of aplication
app.use(handlerError);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
