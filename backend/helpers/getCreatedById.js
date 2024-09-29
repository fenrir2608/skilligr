import jwt from 'jsonwebtoken';
import conn from './connection.js';
import dotenv from 'dotenv';
dotenv.config();

export async function getCreatedById(req) {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const createdById = await conn.query(
            `SELECT id FROM users WHERE email = ?`,
            [decoded.id]
        );
        return createdById[0][0].id;
    } catch (error) {
        console.error('Error getting created by ID:', error);
        throw error;
    }
}
