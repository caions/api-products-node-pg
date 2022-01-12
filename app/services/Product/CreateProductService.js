const ProductModel = require("../../model/ProductRepository");
const ApiError = require("../../utils/apiError");

class CreateProductService {
  async execute(nome, preco) {
    let productModel = new ProductModel(nome, preco);

    let checkProductExists = await productModel.findByName(nome);
    if (checkProductExists) {
      throw new ApiError(400, "Um produto com este nome já foi cadastrado");
    }

    const product = await productModel.create(productModel);

    return product;
  }
}

module.exports = CreateProductService;
