import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']; //Bearer TOKEN
    console.log('authHeader',authHeader);

    try {
        const tokens = req.cookies;

        console.log('auth-token request cookies token', tokens);

        const token = req.cookies?.token || authHeader?.replace('Bearer', '').trim();

        if (token == null) return res.status(400).json({ error: "Null token" });

        if (!token) {
            return res.status(400).json({ error: "Access token not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded', decoded)
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
