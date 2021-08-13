import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the customer is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id
    const cookie = await global.getAuthCookie();
    await request(app).delete(`/api/customers/${id}`).set('Cookie', cookie).send().expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); //to generate a valid MongoDb id        
    await request(app).delete(`/api/customers/${id}`).send().expect(401); //Not Authorized
});

it('returns 200 if the customer has been successfully deleted', async () => {
    const cookie = await global.getAuthCookie();

    const response = await request(app)
        .post('/api/customers')
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            phoneNumber: "+491575312425",
            email : "cust@test.com",
            street : "Frauenlobstr. 3",
            postcode: 65187,
            city: "Wiesbaden",
            country: "Germany"
        });

    await request(app)
        .delete(`/api/customers/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);
});