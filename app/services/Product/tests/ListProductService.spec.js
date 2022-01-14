const FakeProductRepository = require("../../../model/repositories/fakes/FakeProductRepository");
const CreateProductService = require("../CreateProductService");
const ListProductService = require("../ListProductService");

const listProductService = new ListProductService(FakeProductRepository);
const createProductService = new CreateProductService(FakeProductRepository);

describe("Tests with empty dataBase", () => {
  test("should be returned one empty array", async () => {
    const products = await listProductService.execute({});

    expect(products).toStrictEqual([]);
  });
});

describe("Tests with three objects in the dataBase", () => {
  beforeAll(async () => {
    await createProductService.execute("boneca", 14.5);
    await createProductService.execute("boneca2", 14.9);
    await createProductService.execute("bebe", 10.5);
  });

  test("should be returned three products in array", async () => {
    const products = await listProductService.execute({});

    expect(products).toHaveLength(3);
  });

  test("should be returned two filtered product in array with name bola", async () => {
    const products = await listProductService.execute({ nome: "boneca" });

    expect(products).toHaveLength(2);
  });

  test("should be returned two filtered product in array with preco equals to 14", async () => {
    const products = await listProductService.execute({ preco: 14 });

    expect(products).toHaveLength(2);
  });
});
