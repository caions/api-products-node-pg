const UserModel = require("../../model/user.model");

class ListUserService {
  async execute(filter) {
    try {
      const userModel = new UserModel();
      const users = await userModel.filter(filter);
      return users;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ListUserService;
