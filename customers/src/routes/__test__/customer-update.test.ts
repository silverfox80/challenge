import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const cookie = await global.getAuthCookie();
    
    await request(app)
        .put(`/api/customers/${id}`)
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            phoneNumber: "+491575312425",
            email : "cust@test.com",
            street : "Frauenlobstr. 3",
            postcode: 65187,
            city: "Wiesbaden",
            country: "Germany",
            active: true
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/customers/${id}`)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            phoneNumber: "+491575312425",
            email : "cust@test.com",
            street : "Frauenlobstr. 3",
            postcode: 65187,
            city: "Wiesbaden",
            country: "Germany",
            active: true
        })
        .expect(401);
});

it('returns a 400 if the user provides an invalid postCode', async () => {
    const cookie = await global.getAuthCookie();
    const response = 
    await request(app)
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
        .put(`/api/customers/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            phoneNumber: "+491575312425",
            email : "cust@test.com",
            street : "Frauenlobstr. 3",
            postcode: 6518,
            city: "Wiesbaden",
            country: "Germany",
            active: true
        })
        .expect(400); //Bad Request
});

it('updates the customer once provided with valid inputs', async () => {
    const cookie = await global.getAuthCookie();
    const response = 
    await request(app)
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
        .put(`/api/customers/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            phoneNumber: "+491575312425",
            email : "cust@test.com",
            street : "Klopstrasse 13",
            postcode: 65187,
            city: "Wiesbaden",
            country: "Germany",
            active: true
        })
        .expect(200);
});