import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let mongoDBURL = process.env.mongoDBURL;
import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
