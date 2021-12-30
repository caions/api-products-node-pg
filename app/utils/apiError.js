class ApiError {
  constructor(statusCode = 404, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ApiError;
