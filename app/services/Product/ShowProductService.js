const ApiError = require("../../utils/apiError");

class ShowProductService {
  constructor(ProductRepository) {
    this.productRepository = new ProductRepository();
  }

  async execute(id) {
    let product = await this.productRepository.findById(id);

    if (!product) {
      throw new ApiError(404, "Produto não encontrado");
    }
    return product;
  }
}

module.exports = ShowProductService;
