const UserModel = require("../../model/repositories/UserRepository");
const ApiError = require("../../utils/apiError");

class DeleteUserService {
  async execute(id) {
    let userModel = new UserModel();

    let checkUserExists = await userModel.findById(id);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    await userModel.deleteById(id);
  }
}

module.exports = DeleteUserService;
