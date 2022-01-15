const ApiError = require("../../utils/apiError");

class UpdateProductService {
  constructor(ProductRepository) {
    this.productRepository = ProductRepository;
  }

  async execute(id, nome, preco) {
    let checkProductExists = await this.productRepository.findById(id);
    const product = { id, nome, preco };
    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    let checkProductNameAlreadyExists = await this.productRepository.findByName(
      nome
    );
    if (checkProductNameAlreadyExists) {
      throw new ApiError(400, "Esse nome de produto está indisponível");
    }

    await this.productRepository.save(product);

    return product;
  }
}

module.exports = UpdateProductService;
