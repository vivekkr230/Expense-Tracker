import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        payAmount: {
            type: Number,
            required: true,
            min: [0, 'Amount must be a non-negative number']
        },
        category: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
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
            required: false
        },
        updatedby: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: false,
    }
);


const Transaction = mongoose.model('transaction', transactionSchema,'transaction');

export default Transaction 