const UserModel = require("../../model/repositories/UserRepository");
const ApiError = require("../../utils/apiError");
const { compareData } = require("../../utils/bcrypt");
const jwt = require("../../utils/jwt");
const { SECRET_TOKEN_KEY } = require("../../config/environment");

class LoginUserService {
  async execute(email, password) {
    const userModel = new UserModel();
    const findUser = await userModel.findByEmail(email);
    if (findUser) {
      let matchPassword = compareData(password, findUser.password);

      if (matchPassword) {
        const token = jwt.createJwt(findUser.id, SECRET_TOKEN_KEY);
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
