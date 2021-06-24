import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/customers/', currentUser, requireAuth, async (req: Request, res: Response) => {
  
  const filters = {}; //{active:true}
  const customers = await Customer.find(filters).sort( { "lastname": -1 } );    
  
  res.send({ 
    meta: {
      success: true,
      totalCount: 2,
      pageCount: 1,
      currentPage: 1,
      perPage: 20
    },
    result: customers
  });

  
});

export { router as customerIndexRouter };