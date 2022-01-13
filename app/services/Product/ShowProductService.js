const ApiError = require("../../utils/apiError");

class ShowProductService {
  constructor(ProductModel) {
    this.productModel = new ProductModel();
  }

  async execute(id) {
    let product = await this.productModel.findById(id);

    if (!product) {
      throw new ApiError(404, "Produto não encontrado");
    }
    return product;
  }
}

module.exports = ShowProductService;
