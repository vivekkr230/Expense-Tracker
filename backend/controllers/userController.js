import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';
import dotenv from 'dotenv';
dotenv.config();
import authToken from '../utils/authTokenFunction.js';
import bcrypt from 'bcryptjs';
import { statusCode }  from '../utils/statusCode.js';


// // data to send
// const responseBody = {
//     key: razorpayapikey
// };

// console.log(responseBody, 'responseBody');

// // Encrypt the whole response body
// const encryptedBody = encrypt(JSON.stringify(responseBody), secretKey);

// console.log(encryptedBody, 'encryptedBody');




// //encrypted data
// let encryptedData = req.body.encryptedBody;
// console.log('encryptedData', encryptedData);

// //decrypt body data and parse
// encryptedData = decrypt(encryptedData, secretKey);
// const parsedData = JSON.parse(encryptedData);
// console.log('parsedData', parsedData);

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('data', req.body);
        let name = username;

        if (!(name && password)) {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: 'Please send all required data' });
        }

    
        // Find user by name
        const users = await User.find({ name });
        console.log('users',users);

        if (users.length === 0) {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: "Invalid username" });
        }

        // Assuming only one user per name
        const user = users[0];
        console.log('user',user);

        // Check password
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Generate JWT tokens
            const tokens = await authToken(user); // Ensure this function is defined elsewhere
            console.log('tokens',tokens);
            const options = {
                httpOnly: true,
                sameSite: 'None', // Ensure sameSite is set correctly
                secure: true
            };

            return res.cookie('token', tokens, options) // Typically the refresh token is stored in cookies
                .status(statusCode.SUCCESS.code)
                .header('Authorization', `Bearer ${tokens}`)
                .json({
                    message: 'Logged in',
                    username: user.name,
                    Token: tokens
                });
        } else {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: "Incorrect password" });
        }
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ message: err.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        console.log('1')
        const users = await User.find();
        console.log('users', users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const transactiondataAcToUser = async (req, res) => {
    try {
        console.log('1')
        console.log('req user',req.user)
        let name = req.user.name;

        const result = await User.aggregate([
            {
                $lookup: {
                    from: 'transaction',             // Name of the related collection
                    localField: '_id',                // Field from the main collection
                    foreignField: 'id',               // Field from the transaction collection
                    as: 'relatedTransactions'         // Name of the field to add the related documents
                }
            },
            {
                $match: { "name": name }          // Optional: Add filters to match specific documents
            }]);
        console.log('result', result[0].relatedTransactions)
        res.status(200).json({
            message : 'Transaction History',
            data: result[0].relatedTransactions
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const filter = async (req, res) => {
    try {
        console.log('1')
        console.log('req user', req.user)
        let name = req.user.name;
        let category = req.body.category;
        console.log('category', category)

        const result = await User.aggregate([
            {
                $lookup: {
                    from: 'transaction',             // Name of the related collection
                    localField: '_id',                // Field from the main collection
                    foreignField: 'id',               // Field from the transaction collection
                    as: 'relatedTransactions'         // Name of the field to add the related documents
                }
            },
            // {
            //     $match: {
            //         $and: [
            //             { name: name },               // First condition
            //             { age: { $gte: 18 } },        // Second condition
            //             { status: "active" }          // Third condition
                       
            //         ]
            //     }
            // }
            {
                $match: {
                    name: name,                       // Filter by name in the User collection
                    'relatedTransactions.category': category // Filter by category in the related transactions
                }
            },
            {
                $unwind: "$relatedTransactions"       // Optional: Unwind relatedTransactions array to filter by individual transactions
            },
            {
                $match: {
                    'relatedTransactions.category': category // Further filter by category after unwind
                }
            }
        ]);
        let main = [];
        let push = main.push()
        console.log('result', result[0].relatedTransactions)
        res.status(200).json({
            message: 'Transaction History',
            data1: result[0].relatedTransactions,
            data:result
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    console.log('body create',req.body);

    let {
        formData:{
            formData:
            {  name, age, password }
        }   
        } = req.body;

    if (!( name && age && password)){
        return res.status(400).json({message: 'Please send all required data'});
    }

    let createddt = new Date();
    let createdby = 1;
    let salt = 10;

    const checkUsers = await User.find({ name });
    if (checkUsers.length > 0){
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name: name,
        age: age,
        password: hashedPassword,
        createddt: createddt ,
        createdby: createdby
    });
    console.log('user',user);
    try {
        const newUser = await user.save();
        console.log('newUser', newUser);
        res.status(201).json({
            message:'user created successfully ',
            data: newUser,
            success : true
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const logout = async (req, res) => {
    const options = {
        expires: new Date(Date.now() - 1), // Expire the cookie immediately
        httpOnly: true,
        sameSite: 'none',
        secure: true
    };
    // Clear both access token and refresh token cookies
    res.clearCookie('token', options);
    res.status(statusCode.SUCCESS.code).json({ message: 'Logged out successfully' });
}
