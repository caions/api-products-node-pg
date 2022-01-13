const ApiError = require("../../utils/apiError");

class UpdateProductService {
  constructor(ProductModel) {
    this.productModel = new ProductModel();
  }

  async execute(id, nome, preco) {
    let checkProductExists = await this.productModel.findById(id);

    if (!checkProductExists) {
      throw new ApiError(404, "Produto não encontrado");
    }

    let checkProductNameAlreadyExists = await this.productModel.findByName(
      nome
    );
    if (checkProductNameAlreadyExists) {
      throw new ApiError(400, "Esse nome de produto está indisponível");
    }

    await this.productModel.save({ id, nome, preco });

    return { id, nome, preco };
  }
}

module.exports = UpdateProductService;
