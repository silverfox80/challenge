import { NotFoundError, requireAuth } from '@s1lv3rf0x/common';
import express, {Request ,Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    
    if(!ticket){
        throw new NotFoundError();
    }

    res.send(ticket);
});

export {router as showTicketRouter };

