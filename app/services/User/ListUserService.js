class ListUserService {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  async execute(filter) {
    try {
      const userModel = new this.userModel();
      const users = await userModel.filter(filter);
      return users;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ListUserService;
