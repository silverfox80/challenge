import request from 'supertest';
import { app } from '../../app';

it('return current user info', async () => {
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.it',
            password: 'pass1234'
        })
        .expect(201);
    //this will not manage cookie in automatic (like Postman for example), so it is necessary to capture this from the previous response
    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect (response.body.currentUser.email).toEqual('test@test.it');
    //console.log(response.body);
});

it('return null if not authenticated', async () => {
    
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect (response.body.currentUser).toEqual(null);
});