const UserModel = require("../../model/UserRepository");
const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class UpdateUserService {
  async execute(id, nome, password) {
    const hashedPassword = hashData(password);

    let userModel = new UserModel(nome, "", hashedPassword);

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

    delete updateUser.password;

    return updateUser;
  }
}

module.exports = UpdateUserService;
