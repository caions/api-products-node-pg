const ApiError = require("../../utils/apiError");

class DeleteProductService {
  constructor(ProductRepository) {
    this.productRepository = new ProductRepository();
  }

  async execute(id) {
    let checkProductExists = await this.productRepository.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    await this.productRepository.deleteById(id);
  }
}

module.exports = DeleteProductService;
