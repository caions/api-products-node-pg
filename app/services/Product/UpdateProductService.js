const ApiError = require("../../utils/apiError");

class UpdateProductService {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  async execute(id, nome, preco) {
    let productModel = new this.productModel(nome, preco);

    let checkProductExists = await productModel.findById(id);

    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    let checkProductNameAlreadyExists = await productModel.findByName(nome);
    if (checkProductNameAlreadyExists) {
      throw new ApiError(400, "Esse nome de produto está indisponível");
    }

    await productModel.save({ id, ...productModel });

    return productModel;
  }
}

module.exports = UpdateProductService;
