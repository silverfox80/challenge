import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.it',
      password: 'password'
    })
    .expect(201);
});
//async here is not really necessary, but if later adding multiple request inside the same test and use await
it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflas33kjfd',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.it'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: '1234sds'
    })
    .expect(400);
});

it('no duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.it',
      password: 'pass'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.it',
      password: 'pass'
    })
    .expect(400);
});

it('sets a cookie after a successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
  //when we set cookieSession, we must set secure to false if is a test environment, otherwise this test will fail
});