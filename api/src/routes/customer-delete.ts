import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-err';
import { Customer } from '../models/customer';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.delete('/api/customers/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    throw new NotFoundError();
  }
  await customer.delete();

  res.sendStatus(200);
});

export { router as customerDeleteRouter };