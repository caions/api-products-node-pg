class ListProductService {
  constructor(ProductRepository) {
    this.productRepository = ProductRepository;
  }

  async execute(filter) {
    const product = await this.productRepository.filter(filter);
    return product;
  }
}

module.exports = ListProductService;
