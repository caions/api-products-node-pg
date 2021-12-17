const express = require("express");
const route = express.Router();
const productController = require("../controllers/product.controllers");
const verifyJWT = require("../controllers/verifyJwt");

route.post("/auth", productController.auth);

route.use(verifyJWT);
route.get("/", productController.index);
route.get("/:id", verifyJWT, productController.show);
route.post("/", productController.create);
route.put("/:id", productController.update);
route.delete("/:id", productController.destroy);

module.exports = route;
