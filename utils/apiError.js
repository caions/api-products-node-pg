class ApiError{
  statusCode = 400;
   message;
  constructor(statusCode,message){
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ApiError