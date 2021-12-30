const ApiError = require("../utils/apiError");
const { verifyJwt } = require("../utils/jwt");

const checkAuth = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    throw new ApiError(401, "No token provided.");
  }

  const bearer = headers.split(" ");
  const token = bearer[1];

  verifyJwt(token, "token-secreto");
  next();
};

module.exports = checkAuth;
