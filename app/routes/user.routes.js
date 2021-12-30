const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.controllers");

route.get("/", userController.index);
route.get("/:id", userController.show);
route.post("/", userController.create);
route.post("/add", userController.addProduct);
route.post("/del", userController.removeProduct);
route.put("/:id", userController.update);
route.delete("/:id", userController.destroy);

// credentials

route.post("/login", userController.login);
route.post("/signup", userController.register);

module.exports = route;
