const ApiError = require("../../utils/apiError");

class ShowProductService {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  async execute(id) {
    let productModel = new this.productModel();
    let product = await productModel.findById(id);

    if (!product) {
      throw new ApiError(404, "Produto não encontrado");
    }
    return product;
  }
}

module.exports = ShowProductService;
