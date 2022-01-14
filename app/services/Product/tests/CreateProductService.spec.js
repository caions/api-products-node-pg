const ProductRepository = require("../../../model/repositories/fakes/FakeProductRepository");
const CreateProductService = require("../CreateProductService");
const ApiError = require("../../../utils/apiError");

const createProductService = new CreateProductService(ProductRepository);

test("should be returned one product with id", async () => {
  const product = await createProductService.execute("bola", 50);

  expect(product).toHaveProperty("id");
});

test("should be returned one product with id 2", async () => {
  await createProductService.execute("Boneca", 10.5);
  const product = await createProductService.execute("Video Game", 5000.9);

  expect(product).toHaveProperty("id", 2);
});

test("should not be able to create a new product with same name", async () => {
  await createProductService.execute("Bonecas", 10.5);

  await expect(
    createProductService.execute("Bonecas", 10.5)
  ).rejects.toBeInstanceOf(ApiError);
});

test("should not be able to create a new product without nome", async () => {
  await expect(createProductService.execute()).rejects.toBeInstanceOf(ApiError);
});

test("should not be able to create a new product without preco", async () => {
  await expect(createProductService.execute("nome")).rejects.toBeInstanceOf(
    ApiError
  );
});

test("should not be able to create a new product with a numeric name", async () => {
  await expect(createProductService.execute(1234, 4567)).rejects.toBeInstanceOf(
    ApiError
  );
});
