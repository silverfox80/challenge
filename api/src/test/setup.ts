import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

//Typescript need to know that there is a global property called signin
declare global {
    namespace NodeJS {
        interface Global {
            getAuthCookie(): Promise<string[]>; // a Promise that resolve with a cookie (string[])
        }
    }
}

let mongo: any;
// we use the hook function beforeAll (our test) to prepare the Mongo Memory Server for the tests
beforeAll(async () => {
    process.env.JWT_KEY = 'test';  //we need to set a key here, because at this point the key is still not set

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});
// we use the hook function beforeEach (of our test) to clean all the collections of the Mongo Memory Server instance
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
// we use the hook function afterAll (our test) to stop the Mongo Memory Server and disconnect
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.getAuthCookie = async () => {
    const email = 'test@test.it';
    const password = 'password';
  
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email,
        password
      })
      .expect(201);
  
    const cookie = response.get('Set-Cookie');
  
    return cookie;
};