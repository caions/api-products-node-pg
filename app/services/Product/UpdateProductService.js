const ApiError = require("../../utils/apiError");

class UpdateProductService {
  constructor(ProductRepository) {
    this.productRepository = new ProductRepository();
  }

  async execute(id, nome, preco) {
    let checkProductExists = await this.productRepository.findById(id);

    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    let checkProductNameAlreadyExists = await this.productRepository.findByName(
      nome
    );
    if (checkProductNameAlreadyExists) {
      throw new ApiError(400, "Esse nome de produto está indisponível");
    }

    await this.productRepository.save({ id, nome, preco });

    return { id, nome, preco };
  }
}

module.exports = UpdateProductService;
