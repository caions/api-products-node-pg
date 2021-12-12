const apiError = require("./apiError");

const handlerError = (err, req, res) => {
  if (err instanceof apiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

module.exports = handlerError;
