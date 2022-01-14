const FakeProductRepository = require("../../../model/repositories/fakes/FakeProductRepository");
const CreateProductService = require("../CreateProductService");
const ListProductService = require("../ListProductService");
const DeleteProductService = require("../DeleteProductService");
const ApiError = require("../../../utils/apiError");

const createProductService = new CreateProductService(FakeProductRepository);
const deleteProductService = new DeleteProductService(FakeProductRepository);
const listProductService = new ListProductService(FakeProductRepository);

describe("Delete products", () => {
  beforeAll(async () => {
    await createProductService.execute("boneca", 14.5);
    await createProductService.execute("boneca2", 14.9);
    await createProductService.execute("bebe", 10.5);
  });

  test("should be able to remove one product", async () => {
    await deleteProductService.execute(2);

    const products = await listProductService.execute({});

    expect(products).toHaveLength(2);
  });

  test("should not be able to remove one nonexistent product", async () => {
    await expect(deleteProductService.execute(2)).rejects.toBeInstanceOf(
      ApiError
    );
  });

  test("shouldn't be possible to remove a product without providing a number id", async () => {
    await expect(deleteProductService.execute("ok")).rejects.toBeInstanceOf(
      ApiError
    );
  });

  test("shouldn't be possible to remove a product without providing an id", async () => {
    await expect(deleteProductService.execute()).rejects.toBeInstanceOf(
      ApiError
    );
  });
});
