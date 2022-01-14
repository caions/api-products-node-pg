const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class UpdateUserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }
  async execute(id, nome, password) {
    const hashedPassword = hashData(password);

    let checkUserExists = await this.userRepository.findById(id);

    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }
    let updateUser = {
      id: checkUserExists.id,
      nome,
      email: checkUserExists.email,
      password: hashedPassword,
    };

    await this.userRepository.save(updateUser);

    delete updateUser.password;

    return updateUser;
  }
}

module.exports = UpdateUserService;
