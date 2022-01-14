const FakeProductRepository = require("../../../model/repositories/fakes/FakeProductRepository");
const CreateProductService = require("../CreateProductService");
const ListProductService = require("../ListProductService");

test("should be returned one empty array", async () => {
  const listProductService = new ListProductService(FakeProductRepository);

  const products = await listProductService.execute();

  expect(products).toStrictEqual([]);
});

test("should be returned one product in array", async () => {
  const listProductService = new ListProductService(FakeProductRepository);
  const createProductService = new CreateProductService(FakeProductRepository);

  await createProductService.execute("balão", 15.5);
  await createProductService.execute("balão2", 15.5);

  const products = await listProductService.execute();

  expect(products).toHaveLength(2);
});
