import jwt from 'jsonwebtoken';
import conn from './connection.js';
import dotenv from 'dotenv';
dotenv.config();

export async function getUserDetails(req) {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await conn.query(
            `SELECT id,username,email,full_name,contact_no,profile_img,isDeleted,role FROM users WHERE email = ?`,
            [decoded.id]
        );
        return user[0][0];
    } catch (error) {
        console.error('Error getting User: ', error);
        throw error;
    }
}
