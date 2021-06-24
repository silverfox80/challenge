import mongoose from 'mongoose';

//TS and moongose have some problems to work together so we are going to create some interface to solve these issues
// An interface that describe the properties required to create a new Customer
interface CustomerAttrs {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    street: string;
    postcode: number;
    city: string;
    country: string;
    active: boolean;
}
// An interface that describe the properties that a Customer Model has
interface CustomerModel extends mongoose.Model<CustomerDoc> {
    build(attrs: CustomerAttrs): CustomerDoc;
}
// An interface that describe the properties that a Customer Document has
interface CustomerDoc extends mongoose.Document {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    street: string;
    postcode: number;
    city: string;
    country: string;
    active: boolean;    
}

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: false,
        default: true
    },
}, {
    //to customize how the customer document have to turn back into the json,this way we can for example remove properties or alert the property name (like _id into id)
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v; //version key
        }
    }
});

//It can be re-factored in a more functional manner...creating CustomerModel and CustomerDoc interfaces and using the following function
customerSchema.statics.build = (attrs: CustomerAttrs) => {
    return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc,CustomerModel>('Customer', customerSchema);

export { Customer };