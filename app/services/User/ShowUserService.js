const ApiError = require("../../utils/apiError");

class ShowUserService {
  constructor(UserModel) {
    this.userModel = UserModel;
  }
  async execute(id) {
    const userModel = new this.userModel();
    const user = await userModel.findById(id);

    if (!user) {
      throw new ApiError(404, "usuário não encontrado");
    }
    delete user.dataValues.password; //delete field password

    return user;
  }
}

module.exports = ShowUserService;
