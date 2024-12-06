import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../../interface/Error";

const handleCastError = (err: mongoose.Error.CastError) : TGenericErrorResponse=>{
 const errorSources: TErrorSource =[
    {
        path: err.path,
        message: err.message
    }
 ] 


    const statusCode = 400;
    return {
      statusCode,
      message: 'Invalid ID',
       errorSource: errorSources
    }
}

export default handleCastError