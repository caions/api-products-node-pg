const ProductModel = require("../../model/repositories/ProductRepository");
const ApiError = require("../../utils/apiError");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 3)).toBe(3);
});
