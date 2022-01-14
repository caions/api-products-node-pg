class ListUserService {
  constructor(UserRepository) {
    this.userRepository = new UserRepository();
  }

  async execute(filter) {
    try {
      const users = await this.userRepository.filter(filter);
      return users;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ListUserService;
