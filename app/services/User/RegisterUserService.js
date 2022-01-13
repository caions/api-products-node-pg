const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class RegisterUserService {
  constructor(UserModel) {
    this.userModel = new UserModel();
  }
  async execute(nome, email, password) {
    const hashedPassword = hashData(password);
    const checkEmailAlreadyExist = await this.userModel.findByEmail(email);

    if (!checkEmailAlreadyExist) {
      const user = await this.userModel.create({
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
