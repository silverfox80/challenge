import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const cookie = await global.getAuthCookie();
    
    await request(app)
        .put(`/api/users/${id}`)
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            email : "cust@test.com"            
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/users/${id}`)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            email : "cust@test.com"            
        })
        .expect(401);
});

it('returns a 400 if the user provides an invalid email', async () => {
    const cookie = await global.getAuthCookie();
    const response = 
    await request(app)
        .post('/api/users/create')
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            email : "cust@test.com",
            password : "1234"           
    });

    await request(app)
        .put(`/api/users/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            email : "custtest.com"           
        })
        .expect(400); //Bad Request
});

it('updates the user once provided with valid inputs', async () => {
    const cookie = await global.getAuthCookie();
    const response = 
    await request(app)
        .post('/api/users/create')
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            email : "cust@test.com",
            password : "1234"
    });

    await request(app)
        .put(`/api/users/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            firstname: "Pinco",
            lastname : "Pallo",
            email : "cust@newmail.com"   
        })
        .expect(200);
});