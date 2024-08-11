import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const conn = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBDB
}).promise()

export default conn;

