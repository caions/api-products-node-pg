const UserModel = require("../../model/repositories/UserRepository");
const ApiError = require("../../utils/apiError");

class DeleteUserService {
  constructor(UserModel) {
    this.userModel = new UserModel();
  }
  async execute(id) {
    let checkUserExists = await this.userModel.findById(id);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    await this.userModel.deleteById(id);
  }
}

module.exports = DeleteUserService;
