const ApiError = require("../../utils/apiError");

class AddProductUserService {
  constructor(UserModel, ProductModel) {
    this.userModel = UserModel;
    this.productModel = ProductModel;
  }
  async execute(userId, productId) {
    let userModel = new this.userModel();
    let productModel = new this.productModel();

    let checkUserExists = await userModel.findById(userId);
    if (!checkUserExists) {
      throw new ApiError(404, "usuário não encontrado");
    }

    const checkProductExists = await productModel.findById(productId);
    if (!checkProductExists) {
      throw new ApiError(404, "produto não encontrado");
    }

    const result = await userModel.addProduct(userId, productId);
    return result;
  }
}

module.exports = AddProductUserService;
