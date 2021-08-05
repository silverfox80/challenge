import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';

import { NotFoundError,currentUser,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.get('/api/customers/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    throw new NotFoundError();
  }

  res.send(customer);
});

export { router as customerShowRouter };