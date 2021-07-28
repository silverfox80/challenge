import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/', currentUser, requireAuth, async (req: Request, res: Response) => {
  
  let pageNumber:number = req.query.page ? parseInt ( req.query.page as string ) : 1;
  let searchString:string = req.query.search ? req.query.search as string : '';
  let sort: number = req.query.sort ? parseInt ( req.query.sort as string ) : 1;

  const PER_PAGE = 10;
  const filters = {
    email:{'$regex' : searchString, '$options' : 'i'} 
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