const ApiError = require("../../utils/apiError");

class AddProductUserService {
  constructor(UserModel, ProductModel) {
    this.userModel = new UserModel();
    this.productModel = new ProductModel();
  }
  async execute(userId, productId) {
    let checkUserExists = await this.userModel.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await this.productModel.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await this.userModel.addProduct(userId, productId);
    return result;
  }
}

module.exports = AddProductUserService;
