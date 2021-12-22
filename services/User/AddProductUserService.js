const ProductModel = require("../../model/product.model");
const UserModel = require("../../model/user.model");
const ApiError = require("../../utils/apiError");

class AddProductUserService {
  async execute(userId, productId) {
    let userModel = new UserModel();
    let productModel = new ProductModel();

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
