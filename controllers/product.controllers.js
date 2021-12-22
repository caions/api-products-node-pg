const CreateProductService = require("../services/Product/CreateProductService");
const DeleteProductService = require("../services/Product/DeleteProductService");
const ListProductService = require("../services/Product/ListProductService");
const ShowProductService = require("../services/Product/ShowProductService");
const UpdateProductService = require("../services/Product/UpdateProductService");
const ApiError = require("../utils/apiError");

class Product {
  async index(req, res) {
    let { nome, preco } = req.query;
    let filter = {};

    if (nome) {
      filter.nome = nome;
    }

    if (!isNaN(preco)) {
      filter.preco = preco;
    }

    const listProductService = new ListProductService();
    const product = await listProductService.execute(filter);

    res.json(product);
  }

  async show(req, res) {
    let { id } = req.params;

    const showProductService = new ShowProductService();
    const product = await showProductService.execute(id);

    res.json(product);
  }

  async create(req, res) {
    let { nome, preco } = req.body;

    if (!nome || !preco) {
      throw new ApiError(400, "Informe o nome e preco do produto");
    }

    const createProductService = new CreateProductService();
    const product = await createProductService.execute(nome, preco);

    res.json(product);
  }

  async update(req, res) {
    let { nome, preco } = req.body;
    let { id } = req.params;

    const updateProductService = new UpdateProductService();
    const productModel = await updateProductService.execute(id, nome, preco);

    res.json({ id, ...productModel });
  }

  async destroy(req, res) {
    let { id } = req.params;

    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute(id);

    res.json();
  }
}

let productController = new Product();

module.exports = productController;
