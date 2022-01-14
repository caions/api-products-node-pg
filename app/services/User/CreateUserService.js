const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class CreateUserService {
  constructor(UserRepository) {
    this.userRepository = new UserRepository();
  }
  async execute(nome, email, password) {
    const hashedPassword = hashData(password);

    let checkEmailTaken = await this.userRepository.findByEmail(email);
    if (checkEmailTaken) {
      throw new ApiError(400, "Esse email ja está em uso");
    }

    const user = await this.userRepository.create({
      nome,
      email,
      password: hashedPassword,
    });
    delete user.dataValues.password; //delete field password

    return user;
  }
}

module.exports = CreateUserService;
