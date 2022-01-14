const ApiError = require("../../utils/apiError");

class AddProductUserService {
  constructor(UserRepository, ProductRepository) {
    this.userRepository = UserRepository;
    this.productRepository = ProductRepository;
  }
  async execute(userId, productId) {
    let checkUserExists = await this.userRepository.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await this.productRepository.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await this.userRepository.addProduct(userId, productId);
    return result;
  }
}

module.exports = AddProductUserService;
