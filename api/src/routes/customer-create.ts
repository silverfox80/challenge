import express, { Request, Response} from 'express';      
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { Customer } from '../models/customer';

const router = express.Router();

router.post("/api/customers", currentUser, requireAuth, [
        body("firstname")
            .trim()            
            .notEmpty()
            .isLength({ min:2, max: 25 })
            .withMessage('Please insert the First Name (max 25 chars)'),
        body("lastname")
            .trim()
            .notEmpty()
            .isLength({ min:2, max: 25 })
            .withMessage('Please insert the Last Name (max 25 chars)'),
        body("phoneNumber")
            .trim()
            .isLength({ min:5, max: 15 })
            .withMessage('phoneNumber must be between 5 and 15 chars'),
        body("street")
            .trim()
            .notEmpty()
            .isLength({ min:2, max: 25 })
            .withMessage('Please insert the street address (max 25 chars)'),
        body("city")
            .trim()
            .notEmpty()
            .isLength({ min:2, max: 25 })            
            .withMessage('Please insert the city address (max 25 chars)'),
        body("country")
            .trim()
            .notEmpty()
            .isLength({ min:2, max: 25 })
            .withMessage('Please insert the country address (max 25 chars)'),
        body("email")
            .isEmail()
            .withMessage('Email must be valid'),
        body("postcode")
            .trim()
            .isLength({ min:5, max: 10 })
            .isNumeric()
            .withMessage('Postcode must be a number between 4 and 20 chars')
    ],
    validateRequest, //this can be done also into the auth routes
    async (req: Request, res: Response) => {
        //
        const { firstname, lastname, phoneNumber, email, street, postcode, city, country, active } = req.body;
        //First check if the email is already in use
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            throw new BadRequestError('A customer already exists with this email address. Please check.'); 
        }

        const customer = Customer.build({firstname, lastname, phoneNumber, email, street, postcode, city, country, active });
        await customer.save(); //this is needed to persistently save on db

        res.status(201).send(customer);
    }
);

export { router as customerCreateRouter}