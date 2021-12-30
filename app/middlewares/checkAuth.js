const ApiError = require("../utils/apiError");
const { verifyJwt } = require("../utils/jwt");
const { SECRET_TOKEN_KEY } = require("../config/environment");

const checkAuth = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    throw new ApiError(401, "No token provided.");
  }

  const bearer = headers.split(" ");
  const token = bearer[1];

  verifyJwt(token, SECRET_TOKEN_KEY);
  next();
};

module.exports = checkAuth;
