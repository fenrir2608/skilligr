import jwt from 'jsonwebtoken';
import conn from './connection.js';
import dotenv from 'dotenv';
dotenv.config();

export async function getUserDetails(req) {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await conn.query(
            `SELECT 
            u.username, u.email, u.full_name, u.contact_no, u.profile_img, u.isDeleted, u.role,
            ud.status, ud.roll_no, ud.dept, ud.semester, ud.learning_paths, ud.applied_jobs
            FROM 
            users u
            JOIN 
            user_details ud ON u.id = ud.user_id
            WHERE 
            u.email = ?`,
            [decoded.id]
        );
        return user[0][0];
    } catch (error) {
        console.error('Error getting User: ', error);
        throw error;
    }
}
