import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    
    if(!process.env.JWT_KEY){        
        throw new Error('JWT_KEY is missing from env');
    }

    try{
        await mongoose.connect('mongodb://api-mongo-srv:27017/api', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to MongoDb")
    } catch(err) {
        console.log(err);
    }

    app.listen(3000,() => {
        console.log("Listenig on port 3000")
    });
    
}

start();
