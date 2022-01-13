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

    return product;
  }
}

module.exports = CreateProductService;
