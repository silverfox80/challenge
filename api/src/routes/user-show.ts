import express, { Request, Response } from 'express';
import { User } from '../models/user';

import { NotFoundError,currentUser,requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.get('/api/users/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

export { router as userShowRouter };