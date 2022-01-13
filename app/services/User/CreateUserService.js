const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class CreateUserService {
  constructor(UserModel) {
    this.userModel = new UserModel();
  }
  async execute(nome, email, password) {
    const hashedPassword = hashData(password);

    let checkEmailTaken = await this.userModel.findByEmail(email);
    if (checkEmailTaken) {
      throw new ApiError(400, "Esse email ja está em uso");
    }

    const user = await this.userModel.create({
      nome,
      email,
      password: hashedPassword,
    });
    delete user.dataValues.password; //delete field password

    return user;
  }
}

module.exports = CreateUserService;
