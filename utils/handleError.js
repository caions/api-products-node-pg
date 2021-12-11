const apiError = require('./apiError')

const handlerError = (err,req,res,next)=>{
  if(err instanceof apiError){
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
}

module.exports = handlerError