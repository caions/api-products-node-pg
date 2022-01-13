const ApiError = require("../../utils/apiError");

class CreateProductService {
  constructor(ProductModel) {
    this.productModel = new ProductModel();
  }

  async execute(nome, preco) {
    let checkProductExists = await this.productModel.findByName(nome);
    if (checkProductExists) {
      throw new ApiError(400, "Um produto com este nome já foi cadastrado");
    }

    const product = await this.productModel.create({ nome, preco });

    if (!isNaN(product.nome)) {
      throw new ApiError(400, "O nome do produto não pode ser numerico");
    }

    if (!product.nome) {
      throw new ApiError(400, "O produto não contem um nome");
    }

    if (!product.preco) {
      throw new ApiError(400, "O produto não contem um preco");
    }

    return product;
  }
}

module.exports = CreateProductService;
