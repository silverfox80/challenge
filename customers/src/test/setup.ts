import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

//Typescript need to know that there is a global property called signin
declare global {
   var getAuthCookie: () => string[]; // a Promise that resolve with a cookie (string[])
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

global.getAuthCookie = () => {
    // We cannot call the AUTH service from here, otherwise we create a direct dependency between the two services.
    // Build a JWT payload. { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }
    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    // Build the session obj { jwt: MY_JWT }
    const session = { jwt: token };
    //Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');    
    // return the cookie with the auth data inside
    return [`express:sess=${base64}`];
};