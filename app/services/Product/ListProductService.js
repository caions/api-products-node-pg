class ListProductService {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  async execute(filter) {
    const productModel = new this.productModel();
    const product = await productModel.filter(filter);
    return product;
  }
}

module.exports = ListProductService;
