import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    name: string,
    email: string
}
//define a new property (optional) for Request 
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req:Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {  //eq. to (!req.session || !req.session.jwt)
        return next(); //if does not exists go to the next middleware
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;  
        //Typescript is complaining because he already has a Type Definition File for Express that defines what a req is
        //that is why is necessary to define a new optional property for the Request object 

    } catch (err) { } 

    next();
};