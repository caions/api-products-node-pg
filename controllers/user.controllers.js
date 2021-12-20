const UserModel = require("../model/user.model");
const ProductModel = require("../model/product.model");
const ApiError = require("../utils/apiError");
const jwt = require("../utils/jwt");

class User {
  async index(req, res) {
    let { nome, email, password } = req.query;
    let filter = {};

    if (nome) {
      filter.nome = nome;
    }

    if (password) {
      filter.password = password;
    }

    if (email) {
      filter.email = email;
    }

    let userModel = new UserModel();
    let user = await userModel.filter(filter);

    res.json(user);
  }

  async show(req, res) {
    let { id } = req.params;

    let userModel = new UserModel();
    let user = await userModel.findById(id);

    if (!user) {
      throw new ApiError(404, "usuário não encontrado");
    }
    delete user.dataValues.password; //delete field password
    res.json(user);
  }

  async create(req, res) {
    let { nome, email, password } = req.body;

    if (!nome) {
      throw new ApiError(400, "Informe o nome do usuário");
    }

    if (!email) {
      throw new ApiError(400, "Informe o email do usuário");
    }

    if (!password) {
      throw new ApiError(400, "Informe o password do usuário");
    }

    let userModel = new UserModel(nome, email, password);

    let checkEmailTaken = await userModel.findByEmail(email);
    if (checkEmailTaken) {
      throw new ApiError(400, "Esse email ja está em uso");
    }

    const user = await userModel.create(userModel);
    delete user.dataValues.password; //delete field password
    res.status(201).json(user);
  }

  // TODO refactor update
  async update(req, res) {
    let { nome, password } = req.body;
    let { id } = req.params;

    let userModel = new UserModel(nome, password);
    let checkUserExists = await userModel.findById(id);

    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }
    let updateUser = {
      id: checkUserExists.id,
      nome: userModel.nome,
      email: checkUserExists.email,
      password: userModel.password,
    };

    await userModel.save(updateUser);

    res.json(updateUser);
  }

  async destroy(req, res) {
    let { id } = req.params;

    let userModel = new UserModel();

    let checkUserExists = await userModel.findById(id);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    await userModel.deleteById(id);
    res.json();
  }

  async addProduct(req, res) {
    const { userId, productId } = req.body;

    let userModel = new UserModel();
    let productModel = new ProductModel();

    let checkUserExists = await userModel.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await productModel.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await userModel.addProduct(userId, productId);
    res.json(result);
  }

  async removeProduct(req, res) {
    const { userId, productId } = req.body;

    let userModel = new UserModel();
    let productModel = new ProductModel();

    let checkUserExists = await userModel.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await productModel.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await userModel.removeProduct(userId, productId);
    res.json(result);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const userModel = new UserModel();
    const findUser = await userModel.findByEmail(email);
    if (findUser) {
      if (findUser.password == password) {
        const token = jwt.createJwt(findUser.id, "token-secreto");
        res.status(200).json({ token });
      } else {
        throw new ApiError("404", "Credenciais inválidas");
      }
    } else {
      throw new ApiError("404", "Credenciais inválidas");
    }
  }

  async register(req, res) {
    const { nome, email, password } = req.body;
    const userModel = new UserModel(nome, email, password);

    if (!nome) {
      throw new ApiError(400, "Informe o nome do usuário");
    }

    if (!email) {
      throw new ApiError(400, "Informe o email do usuário");
    }

    if (!password) {
      throw new ApiError(400, "Informe o password do usuário");
    }

    const checkEmailAlreadyExist = await userModel.findByEmail(email);

    if (!checkEmailAlreadyExist) {
      const user = await userModel.create(userModel);
      delete user.dataValues.password;
      res.status(201).json(user);
    } else {
      throw new ApiError("400", "Esse email já está em uso");
    }
  }
}

let userController = new User();

module.exports = userController;
