import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
    err:Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    
    if (err instanceof CustomError) {
       return res.status(err.statusCode).send({ errors: err.serializeErrors() }); 
    }
    
    //generic error
    res.status(400).send({
        errors: [{ message: "internal generic error" }]
    });
};

/*
    We need to create a common response structure so that all error responses we send out from any server are similar and easy to understand/parse from the client
    like this:
{ 
    errors:{
        message: string, field?:string
    }[]
}
*/