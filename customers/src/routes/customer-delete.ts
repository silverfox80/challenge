import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';

import { NotFoundError,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.delete('/api/customers/:id', requireAuth, async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    throw new NotFoundError();
  }
  await customer.delete();

  res.sendStatus(200);
});

export { router as customerDeleteRouter };