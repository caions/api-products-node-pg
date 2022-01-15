class FakeProductRepository {
  #products = []; // banco de dados onde serão armazenados os produtos

  filter(product) {
    const { nome, preco } = product;
    if (nome) {
      const regexNome = new RegExp(nome);
      return this.#products.filter((product) => product.nome.match(regexNome));
    }

    if (preco) {
      const regexPreco = new RegExp(preco);
      return this.#products.filter((product) =>
        product.preco.toString().match(regexPreco)
      );
    }

    return this.#products;
  }
  // TODO refactor create function
  create(product) {
    const productWithId = { id: this.#products.length + 1, ...product };
    this.#products.push(productWithId);
    return productWithId;
  }

  findByName(productName) {
    const product = this.#products.find(
      (products) => products.nome === productName
    );

    return product;
  }

  findById(productId) {
    const product = this.#products.find(
      (products) => products.id === productId
    );

    return product;
  }

  async save(product) {
    const { nome, preco, id } = product;
    const findedProduct = this.#products.find((product) => product.id === id);
    findedProduct.nome = nome;
    findedProduct.preco = preco;
    return { id, nome, preco };
  }

  deleteById(id) {
    const index = this.#products.findIndex((product) => product.id === id);
    this.#products.splice(index, 1);
  }
}

module.exports = new FakeProductRepository();
