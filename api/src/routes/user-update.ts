import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';

import { NotFoundError,validateRequest,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.put(
  '/api/users/:id',
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
    body("email")
    .isEmail()
    .withMessage('Email must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError();
    }

    user.set({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email      
    });
    await user.save();

    res.send(user);
  }
);

export { router as userUpdateRouter };