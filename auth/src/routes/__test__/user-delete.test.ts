import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the user is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id
    const cookie = await global.getAuthCookie();
    await request(app).delete(`/api/users/${id}`).set('Cookie', cookie).send().expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id        
    await request(app).delete(`/api/users/${id}`).send().expect(401); //Not Authorized
});

it('returns 200 if the user has been successfully deleted', async () => {
    const cookie = await global.getAuthCookie();

    const response = await request(app)
        .post('/api/users/create')
        .set('Cookie', cookie)
        .send({
            email : "cust@test.com",
            password : "1234"
        });

    await request(app)
        .delete(`/api/users/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);
});