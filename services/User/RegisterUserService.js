const UserModel = require("../../model/user.model");
const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class RegisterUserService {
  async execute(nome, email, password) {
    const hashedPassword = hashData(password);
    let userModel = new UserModel(nome, email, hashedPassword);
    const checkEmailAlreadyExist = await userModel.findByEmail(email);

    if (!checkEmailAlreadyExist) {
      const user = await userModel.create(userModel);
      delete user.dataValues.password;
      return user;
    } else {
      throw new ApiError("400", "Esse email já está em uso");
    }
  }
}

module.exports = RegisterUserService;
