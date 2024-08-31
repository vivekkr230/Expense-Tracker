import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: false,
            default: 0,
            min: [0, 'Age must be a non-negative number']
        },
        password: {
            type: String,
            required: true,
        },
        createddt: {
            type: Date,
            required: true,
            default: Date.now 
        },
        createdby: {
            type: Number,
            required: true,
        },
        updateddt: {
            type: Date,
            required : false
        },
        updatedby: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: false,
    }
);


const User = mongoose.model('user', userSchema,'user');

export default User