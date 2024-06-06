class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  

  const TryCatch = (passedFunc) => async (req, res, next) => {
    try {
      await passedFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  const ErrorMiddleware = async(error, req, resp, next) =>{

    error.message ||= "internal server error";
    error.statusCode ||= 500;


    return resp.status(error.statusCode).json({
        success:false,
        message:error.message,
    })


  }

  export { ErrorHandler, TryCatch, ErrorMiddleware };