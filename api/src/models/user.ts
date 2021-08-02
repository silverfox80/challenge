import mongoose from 'mongoose';
import { Password } from '../helpers/password';

//TS and moongose have some problems to work together so we are going to create some interface to solve these issues
// An interface that describe the properties required to create a new User
interface UserAttrs {
    name: string;
    lastname: string;
    email: string;
    password: string;
}
// An interface that describe the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
// An interface that describe the properties that a User Document has
interface UserDoc extends mongoose.Document {
    name: string;
    lastname: string;
    email: string;
    password: string;
    /* here we can extra properties that maybe Mongo can automatically add on like (created_at, updated_at, etc)*/
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    //to customize how the user document and turn back into the json,this way we can for example remove properties or alert the property name (like _id into id)
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v; //version key
        }
    }
});

//this is a middleware function implemented in Mongoose so that each time we attempt to save a document, it will be called
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) { //this will be considered modified also when creating a new user
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});
/*
// we are going to use this build function (instead of the classic mongoose syntax to take advantage of TS, 
const buildUser = (attrs: UserAttrs) => {
    return new User(attrs);
};
export { User, buildUser };
*/
//It can be re-factored in a more functional manner...creating UserModel and UserDocument interfaces and using the following function
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc,UserModel>('User', userSchema);

export { User };