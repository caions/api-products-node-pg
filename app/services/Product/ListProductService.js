const ProductModel = require("../../model/ProductRepository");

class ListProductService {
  async execute(filter) {
    const productModel = new ProductModel();
    const product = await productModel.filter(filter);
    return product;
  }
}

module.exports = ListProductService;
