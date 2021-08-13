import request from 'supertest';
import { app } from '../../app';

it('returns a 401 for unauthorized access', async () => {
  return request(app)
    .post('/api/customers')
    .send({
      firstname: "Pinco",
      lastname : "Pallo",
      phoneNumber: "+491575312425",
      email : "cust@test.com",
      street : "Frauenlobstr. 3",
      postcode: 65187,
      city: "Wiesbaden",
      country: "Germany"
    })
    .expect(401); //unauthorized
});

it('returns a 400 on bad request (invalid parameter) on customer creation', async () => {

  const cookie = global.getAuthCookie();
  
  await request(app)
    .post('/api/customers')
    .set('Cookie', cookie)
    .send({
      firstname: "Pinco",
      lastname : "",
      phoneNumber: "+491575312425",
      email : "cust@test.com",
      street : "Frauenlobstr. 3",
      postcode: 65187,
      city: "Wiesbaden",
      country: "Germany"
    })
    .expect(400);  //BadRequest
});

it('returns a 201 on successful customer creation', async () => {

  const cookie = global.getAuthCookie();

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
    })
    .expect(201); 
});