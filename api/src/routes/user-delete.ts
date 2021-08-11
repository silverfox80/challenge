import express, { Request, Response } from 'express';
import { User } from '../models/user';

import { NotFoundError, requireAuth } from '@s1lv3rf0x/common';

const router = express.Router();

router.delete('/api/users/:id', requireAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }
  await user.delete();

  res.sendStatus(200);
});

export { router as userDeleteRouter };