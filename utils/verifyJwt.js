const jwt = require("jsonwebtoken");
const ApiError = require("./apiError");
const verifyJWT = (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token) {
    throw new ApiError(401, "No token provided.");
  }

  jwt.verify(token, "token-secreto", (err, decoded) => {
    if (err) {
      throw new ApiError(500, "Failed to authenticate token.");
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
