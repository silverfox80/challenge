import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const cookie = global.getAuthCookie();
    
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', cookie)
        .send({
            title: "Ticket-1",
            price : 10            
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "Ticket-1",
            price : 10            
        })
        .expect(401);
});

it('returns a 400 if the user provides an invalid price', async () => {
    const cookie = global.getAuthCookie();
    const response = 
    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "Pinco",
            price: 10
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "Pinco",
            price: -10
        })
        .expect(400); //Bad Request
});

it('updates the ticket once provided with valid inputs', async () => {
    const cookie = global.getAuthCookie();
    const response = 
    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: "Pinco",
            price: 10
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: "Pinco",
            price: 12
        })
        .expect(200);
});