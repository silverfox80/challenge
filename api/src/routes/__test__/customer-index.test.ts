import request from 'supertest';
import { app } from '../../app';


it('can fetch a list of customers', async () => {
  //create 3 customers
  const cookie = await global.getAuthCookie();
  for (let i=0;i<3;i++){
      await request(app)
              .post('/api/customers')
              .set('Cookie', cookie)
              .send({
                  firstname: "Pinco",
                  lastname : "Pallo",
                  phoneNumber: "+491575312425",
                  email : `cust${i}@test.com`,
                  street : "Frauenlobstr. 3",
                  postcode: 65187,
                  city: "Wiesbaden",
                  country: "Germany"
              });
  };

  const response = await request(app)
                          .get('/api/customers/')
                          .set('Cookie', cookie)
                          .send()
                          .expect(200);
  
  expect(response.body.result.length).toEqual(3);
});