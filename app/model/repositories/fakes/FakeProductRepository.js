class FakeProductRepository {
  #products = []; // banco de dados onde sera armazenado
  constructor(nome, preco) {
    // this.id = this.#products.length;
    this.nome = nome;
    this.preco = preco;
  }

  filter() {
    return this.#products;
  }

  create(product) {
    this.#products.push({ ...product, id: this.#products.length - 1 });
    return { ...product, id: this.#products.length - 1 };
  }

  findByName(productName) {
    const product = this.#products.find(
      (products) => products.nome == productName
    );

    return product;
  }
}

module.exports = new FakeProductRepository();
