import { DEBUG } from "../config/index.js";
import Joi from "joi";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
const ErrorHandler = (err, req, res, next)=>{
    let statusCode = 500;

    let data = {
        message: 'Internal Server Error',
        ...(DEBUG==='true' && {originalError: err.message})
    }
    if(err instanceof Joi.ValidationError){
        statusCode = 401,
        data = {
            message: err.message
        }
    }
    if(err instanceof CustomErrorHandler){
        statusCode = err.statusCode,
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);
}

export default ErrorHandler;