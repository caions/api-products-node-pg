const ApiError = require("../../utils/apiError");
const { hashData } = require("../../utils/bcrypt");

class UpdateUserService {
  constructor(UserModel) {
    this.userModel = new UserModel();
  }
  async execute(id, nome, password) {
    const hashedPassword = hashData(password);

    let checkUserExists = await this.userModel.findById(id);

    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }
    let updateUser = {
      id: checkUserExists.id,
      nome,
      email: checkUserExists.email,
      password: hashedPassword,
    };

    await this.userModel.save(updateUser);

    delete updateUser.password;

    return updateUser;
  }
}

module.exports = UpdateUserService;
