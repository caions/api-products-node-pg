const ApiError = require("../utils/apiError");
const ListUserService = require("../services/User/ListUserService");
const ShowUserService = require("../services/User/ShowUserService");
const CreateUserService = require("../services/User/CreateUserService");
const UpdateUserService = require("../services/User/UpdateUserService");
const DeleteUserService = require("../services/User/DeleteUserService");
const AddProductUserService = require("../services/User/AddProductUserService");
const RemoveProductUserService = require("../services/User/RemoveProductUserService");
const LoginUserService = require("../services/User/LoginUserService");
const RegisterUserService = require("../services/User/RegisterUserService");

class User {
  async index(req, res) {
    let { nome, email } = req.query;
    let filter = {};

    if (nome) {
      filter.nome = nome;
    }

    if (email) {
      filter.email = email;
    }

    const userModel = new ListUserService();
    let user = await userModel.execute(filter);

    res.json(user);
  }

  async show(req, res) {
    const { id } = req.params;

    const showUserService = new ShowUserService();
    const user = await showUserService.execute(id);

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

    const createUserService = new CreateUserService();
    const user = await createUserService.execute(nome, email, password);

    res.status(201).json(user);
  }

  async update(req, res) {
    let { nome, password } = req.body;
    let { id } = req.params;

    const updateUserService = new UpdateUserService();
    const updateUser = await updateUserService.execute(id, nome, password);

    res.json(updateUser);
  }

  async destroy(req, res) {
    let { id } = req.params;

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute(id);

    res.json();
  }

  async addProduct(req, res) {
    const { userId, productId } = req.body;

    const addProductUserService = new AddProductUserService();
    const result = await addProductUserService.execute(userId, productId);

    res.json(result);
  }

  async removeProduct(req, res) {
    const { userId, productId } = req.body;

    const removeProductUserService = new RemoveProductUserService();
    const result = await removeProductUserService.execute(userId, productId);
    res.json(result);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const loginUserService = new LoginUserService();
    const token = await loginUserService.execute(email, password);

    res.status(200).json({ token });
  }

  async register(req, res) {
    const { nome, email, password } = req.body;

    if (!nome) {
      throw new ApiError(400, "Informe o nome do usuário");
    }

    if (!email) {
      throw new ApiError(400, "Informe o email do usuário");
    }

    if (!password) {
      throw new ApiError(400, "Informe o password do usuário");
    }

    const registerUserService = new RegisterUserService();
    const user = await registerUserService.execute(nome, email, password);

    res.status(201).json(user);
  }
}

let userController = new User();

module.exports = userController;
