const FakeProductRepository = require("../../../model/repositories/fakes/FakeProductRepository");
const CreateProductService = require("../CreateProductService");
const ShowProductService = require("../ShowProductService");
const UpdateProductService = require("../UpdateProductService");
const ApiError = require("../../../utils/apiError");

const createProductService = new CreateProductService(FakeProductRepository);
const updateProductService = new UpdateProductService(FakeProductRepository);
const showProductService = new ShowProductService(FakeProductRepository);

describe("Update products", () => {
  beforeAll(async () => {
    await createProductService.execute("boneca", 14.5);
    await createProductService.execute("boneca2", 14.9);
    await createProductService.execute("bebe", 10.5);
  });

  test("should be able to update one product", async () => {
    await updateProductService.execute(2, "bonecona", 17.0);
    const updatedProduct = await showProductService.execute(2);

    expect(updatedProduct).toHaveProperty("id", 2);
    expect(updatedProduct).toHaveProperty("nome", "bonecona");
    expect(updatedProduct).toHaveProperty("preco", 17.0);
  });

  test("shouldn't be possible to update a nonexistent product", async () => {
    await expect(
      updateProductService.execute(4, "Carrinho", 50.55)
    ).rejects.toBeInstanceOf(ApiError);
  });

  test("shouldn't be possible to update a product with a already name", async () => {
    await expect(
      updateProductService.execute(3, "boneca", 50.55)
    ).rejects.toBeInstanceOf(ApiError);
  });
});
