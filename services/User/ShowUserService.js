const UserModel = require("../../model/user.model");
const ApiError = require("../../utils/apiError");

class ShowUserService {
  async execute(id) {
    const userModel = new UserModel();
    const user = await userModel.findById(id);

    if (!user) {
      throw new ApiError(404, "usuário não encontrado");
    }
    delete user.dataValues.password; //delete field password

    return user;
  }
}

module.exports = ShowUserService;
