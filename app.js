const express = require("express");
const app = express();
const routeProduct = require("./routes/product");
const PORT = 3000;
require("./model/dbConnection");

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use("/", routeProduct);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
