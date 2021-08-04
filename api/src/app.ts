import express from 'express';       //importing express framework
import 'express-async-errors';
import { json } from 'body-parser';  //using json middleware to parse incoming req with json payloads
import cookieSession from 'cookie-session'; // we are going to store a JWT inside a cookie to realize (and transport) the authentication mechanism

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { customerCreateRouter } from './routes/customer-create';
import { customerShowRouter } from './routes/customer-show';
import { customerIndexRouter } from './routes/customer-index';
import { customerUpdateRouter } from './routes/customer-update';
import { customerDeleteRouter } from './routes/customer-delete';

import { userCreateRouter } from './routes/user-create';
import { userShowRouter } from './routes/user-show';
import { userIndexRouter } from './routes/user-index';
import { userUpdateRouter } from './routes/user-update';
import { userDeleteRouter } from './routes/user-delete';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-err';

const app = express();
app.set('trust proxy',true); //to make sure that express understands that is behind a proxy of Ingress nginx and still trust the traffic as secure
app.use(json());
app.use(
    cookieSession({
        //we are disabling encryption because JWT will already do that
        signed: false,
        //cookie will only be used if a user is visiting the application on a https connection (secure: true)
        secure: process.env.NODE_ENV !== 'test'  //this way we set to false if we are in a test env
    })
)
//Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(customerCreateRouter);
app.use(customerShowRouter);
app.use(customerIndexRouter);
app.use(customerUpdateRouter);
app.use(customerDeleteRouter);
app.use(userCreateRouter);
app.use(userShowRouter);
app.use(userIndexRouter);
app.use(userUpdateRouter);
app.use(userDeleteRouter);

app.all('*', async (req,res) => {
    throw new NotFoundError();
});
//Error handler middleware
app.use(errorHandler);
//

export { app };