class FakeProductRepository {
  #products = []; // banco de dados onde sera armazenado
  static lastId = 0;
  id;
  constructor(nome, preco) {
    this.id = ++FakeProductRepository.lastId;
    this.nome = nome;
    this.preco = preco;
  }

  filter() {
    return this.#products;
  }

  create(product) {
    this.#products.push(product);
    return product;
  }
}

module.exports = FakeProductRepository;

//
