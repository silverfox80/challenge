import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/customers/:q?', currentUser, requireAuth, async (req: Request, res: Response) => {
  
  const { q } = req.params;

  let customers = [{}];

  if (!q){
    customers = await Customer.find({
      active: true
    }).sort( { "lastname": -1 } );    
  }
  res.send(customers);

  
});

export { router as customerIndexRouter };