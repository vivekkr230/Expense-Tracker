import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


//created token for every user and give 10 min of expiry time after this link expired
async function authToken({ name, password }) {
    const user = { name, password };

    //authtokenfunction
    console.log('authtokenfunction', name, password);
    const token = jwt.sign(user, process.env.JWT_SECRET,{ expiresIn: '1 day' });
    console.log(token, 'token');
    return token;
}

export default authToken ;