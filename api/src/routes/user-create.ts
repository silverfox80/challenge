import express, { Request, Response} from 'express';      
import { body } from 'express-validator';
import { User } from '../models/user';

import { BadRequestError,validateRequest,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.post("/api/users/create", requireAuth, [
    body("firstname"),
    body("lastname"),
    body("email")
        .isEmail()
        .withMessage('Email must be valid'),
    body("password")
        .trim()
        .isLength({ min:4, max: 20 })
        .withMessage('Password must be between 4 and 20 chars')
    ],
    validateRequest, //this can be done also into the auth routes
    async (req: Request, res: Response) => {
        //
        const { firstname,lastname,email,password } = req.body;
        //First check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('User already exists'); 
        }

        const user = User.build({ firstname,lastname,email,password });
        await user.save(); //this is needed to persistently save on db

        res.status(201).send(user);
    }
);

export { router as userCreateRouter}