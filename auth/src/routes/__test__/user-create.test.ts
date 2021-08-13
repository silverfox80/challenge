import request from 'supertest';
import { app } from '../../app';

it('returns a 401 for unauthorized access', async () => {
  return request(app)
    .post('/api/users/create')
    .send({
      firstname: "Pinco",
      lastname : "Pallo",
      email : "cust@test.com",
      password: "1234"
    })
    .expect(401); //unauthorized
});

it('returns a 400 on bad request (invalid parameter) on user creation', async () => {

  const cookie = await global.getAuthCookie();
  
  await request(app)
    .post('/api/users/create')
    .set('Cookie', cookie)
    .send({
      firstname: "Pinco",
      lastname : "",
      email : "custtest.com",
      password: "1234"
    })
    .expect(400);  //BadRequest
});

it('returns a 201 on successful user creation', async () => {

  const cookie = await global.getAuthCookie();

  await request(app)
    .post('/api/users/create')
    .set('Cookie', cookie)
    .send({
      firstname: "Pinco",
      lastname : "Pallo",
      email : "cust@test.com",
      password : "1234"
    })
    .expect(201); 
});