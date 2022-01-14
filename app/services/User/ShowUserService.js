const ApiError = require("../../utils/apiError");

class ShowUserService {
  constructor(UserRepository) {
    this.userRepository = new UserRepository();
  }
  async execute(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "usuário não encontrado");
    }
    delete user.dataValues.password; //delete field password

    return user;
  }
}

module.exports = ShowUserService;
