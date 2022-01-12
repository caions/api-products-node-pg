const ProductModel = require("../../model/ProductRepository");
const UserModel = require("../../model/UserRepository");
const ApiError = require("../../utils/apiError");

class RemoveProductUserService {
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

    const result = await userModel.removeProduct(userId, productId);

    return result;
  }
}

module.exports = RemoveProductUserService;
