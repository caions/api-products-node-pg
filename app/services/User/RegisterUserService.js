const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class RegisterUserService {
  constructor(UserRepository) {
    this.userRepository = new UserRepository();
  }
  async execute(nome, email, password) {
    const hashedPassword = hashData(password);
    const checkEmailAlreadyExist = await this.userRepository.findByEmail(email);

    if (!checkEmailAlreadyExist) {
      const user = await this.userRepository.create({
        nome,
        email,
        password: hashedPassword,
      });
      delete user.dataValues.password;
      return user;
    } else {
      throw new ApiError("400", "Esse email já está em uso");
    }
  }
}

module.exports = RegisterUserService;
