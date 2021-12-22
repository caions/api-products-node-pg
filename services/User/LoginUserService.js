const UserModel = require("../../model/user.model");
const ApiError = require("../../utils/apiError");
const { compareData } = require("../../utils/bcrypt");
const jwt = require("../../utils/jwt");

class LoginUserService {
  async execute(email, password) {
    const userModel = new UserModel();
    const findUser = await userModel.findByEmail(email);
    if (findUser) {
      let matchPassword = compareData(password, findUser.password);

      if (matchPassword) {
        const token = jwt.createJwt(findUser.id, "token-secreto");
        return token;
      } else {
        throw new ApiError("404", "Credenciais inválidas");
      }
    } else {
      throw new ApiError("404", "Credenciais inválidas");
    }
  }
}

module.exports = LoginUserService;
