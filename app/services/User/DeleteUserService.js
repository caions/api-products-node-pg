const UserRepository = require("../../model/repositories/UserRepository");
const ApiError = require("../../utils/apiError");

class DeleteUserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }
  async execute(id) {
    let checkUserExists = await this.userRepository.findById(id);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    await this.userRepository.deleteById(id);
  }
}

module.exports = DeleteUserService;
