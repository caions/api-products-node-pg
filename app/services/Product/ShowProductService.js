const ProductModel = require("../../model/repositories/ProductRepository");
const ApiError = require("../../utils/apiError");

class ShowProductService {
  async execute(id) {
    let productModel = new ProductModel();
    let product = await productModel.findById(id);

    if (!product) {
      throw new ApiError(404, "Produto não encontrado");
    }
    return product;
  }
}

module.exports = ShowProductService;
