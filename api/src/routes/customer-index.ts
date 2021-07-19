import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/customers/', currentUser, requireAuth, async (req: Request, res: Response) => {
  
  let pageNumber:number = req.query.page ? parseInt ( req.query.page as string ) : 1;
  let searchString:string = req.query.search ? req.query.search as string : '';
  let sort: number = req.query.sort ? parseInt ( req.query.sort as string ) : 1;

  const PER_PAGE = 10;
  const filters = {
    active:true,
    $or: 
        [  { lastname:{'$regex' : searchString, '$options' : 'i'} }, 
           { city:{'$regex' : searchString, '$options' : 'i'} }
        ]
  };

  const customers = await Customer.find(filters)
                                  .sort( { "lastname": sort } )
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