const ApiError = require("../../utils/apiError");

class DeleteProductService {
  constructor(ProductModel) {
    this.productModel = new ProductModel();
  }

  async execute(id) {
    let checkProductExists = await this.productModel.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    await this.productModel.deleteById(id);
  }
}

module.exports = DeleteProductService;
