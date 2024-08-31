import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();


const decrypt = (cipherdata) => {
    //check data first
    if (data == null) {
        return data
    }

    //take key and iv from .env file
    let secretKey = process.env.ENCRYPT_DECRYPT_KEY;
    let secretIV = process.env.ENCRYPT_DECRYPT_IV;
    
    //parse key and iv
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.enc.Utf8.parse(secretIV); 

    //converting to bytes
    const bytes = CryptoJS.AES.decrypt(cipherdata, key, { iv: iv });
    return bytes.toString(CryptoJS.enc.Utf8);
};

export default decrypt;