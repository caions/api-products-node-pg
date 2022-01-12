const UserModel = require("../../model/UserRepository");
const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class CreateUserService {
  async execute(nome, email, password) {
    const hashedPassword = hashData(password);

    let userModel = new UserModel(nome, email, hashedPassword);

    let checkEmailTaken = await userModel.findByEmail(email);
    if (checkEmailTaken) {
      throw new ApiError(400, "Esse email ja está em uso");
    }

    const user = await userModel.create(userModel);
    delete user.dataValues.password; //delete field password

    return user;
  }
}

module.exports = CreateUserService;
