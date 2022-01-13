class ListUserService {
  constructor(UserModel) {
    this.userModel = new UserModel();
  }

  async execute(filter) {
    try {
      const users = await this.userModel.filter(filter);
      return users;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ListUserService;
