const ApiError = require("../../utils/apiError");

class DeleteProductService {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  async execute(id) {
    let productModel = new this.productModel();

    let checkProductExists = await productModel.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    await productModel.deleteById(id);
  }
}

module.exports = DeleteProductService;
