import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the user is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id
    const cookie = await global.getAuthCookie();
    await request(app).get(`/api/users/${id}`).set('Cookie', cookie).send().expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id        
    await request(app).get(`/api/users/${id}`).send().expect(401); //Not Authorized
});

it('returns the user if the user has been found', async () => {
    const cookie = await global.getAuthCookie();
    const email_param = "cust@test.com";

    const response = await request(app)
        .post('/api/users/create')
        .set('Cookie', cookie)
        .send({
            email : email_param,
            password: "Germany"
        });

    const userResponse = await request(app)
        .get(`/api/users/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(userResponse.body.email).toEqual(email_param);
});