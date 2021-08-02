import express, { Request, Response} from 'express';    
import { body,validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../helpers/password'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
    '/api/users/signin', 
    [
        body("email")
            .isEmail()
            .withMessage('Email must be valid'),
        body("password")
            .trim()
            .notEmpty()
            .withMessage('You have to supply a password')
    ],
    async (req: Request,res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());        
        }

        const { email,password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
        }
        //check password using the helper function
        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );
        if (!passwordsMatch) {
            throw new BadRequestError('Passwords do not match');  
        }

        // Generate a JWT ...        
        const userJwt = jwt.sign({
            id: existingUser.id,
            name: `${existingUser.name} ${existingUser.lastname}`, 
            email: existingUser.email
        }, process.env.JWT_KEY!);  //this key needs to be shared through all the services, to do so, we can use kubernates secrets
        
        //...and store it on the session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter}