const express = require("express");
const route = express.Router();
const productController = require('../controllers/product.controllers')

route.get("/", productController.index);
route.get("/:id", productController.show);
route.post("/", productController.create);
route.put("/:id", productController.update);
route.delete("/:id", productController.destroy);

module.exports = route;
