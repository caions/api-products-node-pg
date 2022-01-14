class ListUserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
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
