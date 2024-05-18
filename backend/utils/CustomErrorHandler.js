class CustomErrorHandler extends Error{
    constructor(statusCode, message){
        super()
        this.statusCode = statusCode;
        this.message = message;
    }

    static notValid(message){
        return new CustomErrorHandler(401, message);
    }

}

export default CustomErrorHandler;