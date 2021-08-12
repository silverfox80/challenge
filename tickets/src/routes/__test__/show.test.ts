import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id
    const cookie = global.getAuthCookie();
    await request(app).get(`/api/tickets/${id}`).set('Cookie', cookie).send().expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id        
    await request(app).get(`/api/tickets/${id}`).send().expect(401); //Not Authorized
});

it('returns the ticket if the ticket has been found', async () => {
    const cookie = global.getAuthCookie();
    const title = "Rambo";
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title, price
        });

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});