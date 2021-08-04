import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-err';
import { User } from '../models/user';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

export { router as userShowRouter };