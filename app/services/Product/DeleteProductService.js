const ApiError = require("../../utils/apiError");

class DeleteProductService {
  constructor(ProductRepository) {
    this.productRepository = ProductRepository;
  }

  async execute(id) {
    if (!id) {
      throw new ApiError(404, "O Id do Produto não foi informado");
    }

    if (isNaN(id)) {
      throw new ApiError(404, "O Id do Produto deve do tipo number");
    }

    let checkProductExists = await this.productRepository.findById(id);
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    await this.productRepository.deleteById(id);
  }
}

module.exports = DeleteProductService;
