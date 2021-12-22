const ProductModel = require("../../model/product.model");
const ApiError = require("../../utils/apiError");

class DeleteProductService {
  async execute(id) {
    let productModel = new ProductModel();

    let checkProductExists = await productModel.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    await productModel.deleteById(id);
  }
}

module.exports = DeleteProductService;
