import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';

import { currentUser,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.get('/api/customers/', currentUser, requireAuth, async (req: Request, res: Response) => {
  
  let pageNumber:number = req.query.page ? parseInt ( req.query.page as string ) : 1;
  let searchString:string = req.query.search ? req.query.search as string : '';
  let sort: number = req.query.sort ? parseInt ( req.query.sort as string ) : 1;
  let sortcol: string = req.query.sortcol ? req.query.sortcol as string : 'lastname';

  const PER_PAGE = 10;
  const filters = {
    active:true,
    $or: 
        [  
          { name:{'$regex' : searchString, '$options' : 'i'} },
          { lastname:{'$regex' : searchString, '$options' : 'i'} }, 
          { city:{'$regex' : searchString, '$options' : 'i'} }
        ]
  };
  const sortObj = { [sortcol]: sort };

  const customers = await Customer.find( filters )
                                  .sort( sortObj )
                                  .skip( pageNumber > 1 ? ( ( pageNumber - 1 ) * PER_PAGE ) : 0 )
                                  .limit(PER_PAGE);  
    
  let countTotal = await Customer.countDocuments(filters);
  let countWithConstraints = Math.ceil(countTotal / PER_PAGE);

  res.send({ 
    meta: {
      success: true,
      totalCount: countTotal,
      pageCount: countWithConstraints,
      currentPage: pageNumber,
      perPage: PER_PAGE
    },
    result: customers
  });
  
});

export { router as customerIndexRouter };