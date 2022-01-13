class FakeProductRepository {
  #products = []; // banco de dados onde sera armazenado
  constructor(nome, preco) {
    //this.id = 1;
    this.nome = nome;
    this.preco = preco;
  }

  filter() {
    return this.#products;
  }

  create(product) {
    this.#products.push({ ...product, id: this.#products.length });
    return { ...product, id: this.#products.length };
  }

  findByName(productName) {
    const product = this.#products.find(
      (products) => products.nome == productName
    );

    return product;
  }
}

module.exports = FakeProductRepository;
