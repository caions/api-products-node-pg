const UserModel = require("../model/user.model");
const ApiError = require("../utils/apiError");

class User {
  async index(_, res) {
    let userModel = new UserModel();
    let user = await userModel.filter();

    if (user) {
      res.json(user);
    } else {
      throw new ApiError(404, "usuário não encontrado");
    }
  }

  async show(req, res) {
    let { id } = req.params;

    if (isNaN(id)) {
      throw new ApiError(400, "Informe o id do usuário");
    }

    let userModel = new UserModel();
    let user = await userModel.findById(id);

    if (user != null) {
      res.json(user);
    } else {
      throw new ApiError(404, "usuário não encontrado");
    }
  }

  async create(req, res) {
    let { nome, idade } = req.body;

    if (!nome || !idade) {
      throw new ApiError(400, "Informe o nome e idade do usuário");
    }

    let userModel = new UserModel(nome, idade);

    let checkUserExists = await userModel.findByName(nome);

    if (checkUserExists != null) {
      throw new ApiError(400, "Esse usuário já foi cadastrado");
    }

    const user = await userModel.create(userModel);
    if (user) {
      res.json(user);
    } else {
      throw new ApiError(404, "usuário não encontrado");
    }
  }

  async update(req, res) {
    let { nome, idade } = req.body;
    let { id } = req.params;

    if (isNaN(id)) {
      throw new ApiError(400, "Informe o id do usuário");
    }

    let userModel = new UserModel(nome, idade);
    let checkUserExists = await userModel.findById(id);

    if (checkUserExists != null) {
      let user = await userModel.save({ id, ...userModel });
      if (user) {
        res.json({ id, ...userModel });
      } else {
        throw new ApiError(404, "usuário não encontrado");
      }
    } else {
      throw new ApiError(404, "usuário não encontrado");
    }
  }

  async destroy(req, res) {
    let { id } = req.params;

    if (isNaN(id)) {
      throw new ApiError(400, "Informe o id do usuário");
    }

    let userModel = new UserModel();
    let checkUserExists = await userModel.findById(id);
    if (checkUserExists != null) {
      const user = await userModel.deleteById(id);
      if (user) {
        res.json();
      } else {
        throw new ApiError(404, "usuário não encontrado");
      }
    } else {
      throw new ApiError(404, "usuário não encontrado");
    }
  }
}

let userController = new User();

module.exports = userController;
