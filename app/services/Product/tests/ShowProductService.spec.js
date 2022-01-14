const FakeProductRepository = require("../../../model/repositories/fakes/FakeProductRepository");
const CreateProductService = require("../CreateProductService");
const ShowProductService = require("../ShowProductService");
const DeleteProductService = require("../DeleteProductService");
const ApiError = require("../../../utils/apiError");

const createProductService = new CreateProductService(FakeProductRepository);
const deleteProductService = new DeleteProductService(FakeProductRepository);
const showProductService = new ShowProductService(FakeProductRepository);

describe("Delete products", () => {
  beforeAll(async () => {
    await createProductService.execute("boneca", 14.5);
    await createProductService.execute("boneca2", 14.9);
    await createProductService.execute("bebe", 10.5);
  });

  test("should be able to get one product", async () => {
    const products = await showProductService.execute(1);

    expect(products).toHaveProperty("id", 1);
  });

  /*  test("shouldn't be possible to remove a product without providing an id", async () => {
    await expect(deleteProductService.execute()).rejects.toBeInstanceOf(
      ApiError
    );
  }); */
});
