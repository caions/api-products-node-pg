const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.controllers");

route.get("/", userController.index);
route.get("/:id", userController.show);
route.post("/", userController.create);
route.post("/add", userController.addProduct);
route.put("/:id", userController.update);
route.delete("/:id", userController.destroy);

module.exports = route;
