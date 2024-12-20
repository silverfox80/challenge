import express, { Request, Response } from 'express';
import { User } from '../models/user';

import { requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.get('/api/users/', requireAuth, async (req: Request, res: Response) => {
  
  let pageNumber:number = req.query.page ? parseInt ( req.query.page as string ) : 1;
  let searchString:string = req.query.search ? req.query.search as string : '';
  let sort: number = req.query.sort ? parseInt ( req.query.sort as string ) : 1;

  const PER_PAGE = 10;
  const filters = {
    $or: 
        [
          { name:{'$regex' : searchString, '$options' : 'i'} }, 
          { lastname:{'$regex' : searchString, '$options' : 'i'} },
          { email:{'$regex' : searchString, '$options' : 'i'} }
        ]
  };

  const users = await User.find(filters)
                                  .sort( { "email": sort } )
                                  .skip( pageNumber > 1 ? ( ( pageNumber - 1 ) * PER_PAGE ) : 0 )
                                  .limit(PER_PAGE);  
    
  let countTotal = await User.countDocuments(filters);
  let countWithConstraints = Math.ceil(countTotal / PER_PAGE);

  res.send({ 
    meta: {
      success: true,
      totalCount: countTotal,
      pageCount: countWithConstraints,
      currentPage: pageNumber,
      perPage: PER_PAGE
    },
    result: users
  });
  
});

export { router as userIndexRouter };