const express = require("express");
const route = express.Router();
const productController = require('../controllers/product.controllers')

route.get("/", productController.getAll);
route.get("/:id", productController.getOne);
route.post("/", productController.create);
route.put("/:id", productController.update);
route.delete("/:id", productController.delete);

module.exports = route;
