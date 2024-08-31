import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();


const encrypt = (data) => {
    //check data first
    if(data==null){
        return data
    }   

    //take key and iv from .env file
    let secretKey = process.env.ENCRYPT_DECRYPT_KEY;
    let secretIV = process.env.ENCRYPT_DECRYPT_IV;

    //parsing key and iv
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.enc.Utf8.parse(secretIV); 

    //encryption
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv }).toString();
    return encrypted;
};

export default encrypt;

