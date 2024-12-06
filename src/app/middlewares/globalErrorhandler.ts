/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../../interface/Error';
import config from '../config';
import handleZodError from '../errors/handleZodErrors';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import { APPerror } from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req,res, next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  // eslint-disable-next-line prefer-const
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something fucking wrong!',
    }
  ];


  if (err instanceof ZodError) {

    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource
  }else if(err?.name === "CastError"){
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource

  }
  
  else if(err?.code === 11000 ){
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource

  }
  else if( err instanceof APPerror){
    
    statusCode = err?.statusCode;
    message = err.message;
    errorSource = [{
      path: '',
      message: err?.message
    }]

  }
  else if( err instanceof Error){
    
    message = err.message;
    errorSource = [{
      path: '',
      message: err?.message
    }]

  }
  //ultimate Return
   res.status(statusCode).json({
    success: false,
    message,
    
    errorSource,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
