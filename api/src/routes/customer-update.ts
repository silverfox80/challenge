import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Customer } from '../models/customer';

import { NotFoundError,validateRequest,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.put(
  '/api/customers/:id',
  requireAuth,
  [
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
    .withMessage('Postcode must be a number between 4 and 20 chars'),
    body("active")
    .isBoolean()
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      throw new NotFoundError();
    }

    customer.set({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phoneNumber: req.body.phoneNumber, 
      email: req.body.email, 
      street: req.body.street, 
      postcode: req.body.postcode, 
      city: req.body.city, 
      country: req.body.country,
      active: req.body.active
    });
    await customer.save();

    res.send(customer);
  }
);

export { router as customerUpdateRouter };