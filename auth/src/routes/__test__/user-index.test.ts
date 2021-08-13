import request from 'supertest';
import { app } from '../../app';


it('can fetch a list of users', async () => {
  //create 3 users
  const cookie = await global.getAuthCookie();
  for (let i=0;i<3;i++){
      await request(app)
              .post('/api/users/create')
              .set('Cookie', cookie)
              .send({
                  firstname: "Pinco",
                  lastname : "Pallo",
                  email : `cust${i}@test.com`,
                  password : '1234'
              });
  };

  const response = await request(app)
                          .get('/api/users/')
                          .set('Cookie', cookie)
                          .send()
                          .expect(200);

  expect(response.body.result.length).toEqual(4);  //the 3 users created more the current logged user
});