class FakeProductRepository {
  #products = []; // banco de dados onde serão armazenados os produtos

  filter() {
    return this.#products;
  }
  // TODO refactor create function
  create(product) {
    const productWithId = { id: this.#products.length, ...product };
    this.#products.push(productWithId);
    return productWithId;
  }

  findByName(productName) {
    const product = this.#products.find(
      (products) => products.nome === productName
    );

    return product;
  }
}

module.exports = new FakeProductRepository();
