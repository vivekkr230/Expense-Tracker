import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import transactionRoute from './routes/transactionRoute.js'
import dotenv from 'dotenv';
dotenv.config();
let PORT = process.env.PORT || 9800;
import connectDB from './config/db.js';
const app = express();



//----------------------------------middleware---------------------------//
app.use(express.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['X-Custom-Header', 'X-Another-Header']
    }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
//-----------------------------------------------------------------------//




//-----------------------------define routes-------------------------------//
app.use('/api/users', userRoutes);
app.use('/api/transaction', transactionRoute);
//-------------------------------------------------------------------------//





//----------------------------database and server connection----------------//
connectDB().then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});