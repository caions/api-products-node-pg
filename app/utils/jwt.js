const jwt = require("jsonwebtoken");
const ApiError = require("./apiError");

const verifyJwt = (token, secret) => {
  jwt.verify(token, secret, (err) => {
    if (err) {
      throw new ApiError(500, "Failed to authenticate token.");
    }
  });
};

const createJwt = (payload, secret) => {
  return jwt.sign({ payload }, secret, {
    // expiresIn: 300, // expires in 5min
  });
};

module.exports = { createJwt, verifyJwt };
