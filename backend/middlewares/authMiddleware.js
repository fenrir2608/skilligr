import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import conn from "../helpers/connection.js";

dotenv.config();

export const verify = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied.",
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
      error: err.message,
    });
  }
};

export const verifyAdmin =  (req, res, next) => {
  try {
    verify(req, res, async () => {
      const result =  await conn.query(
        `SELECT role FROM users WHERE email = ?`,
        [req.user.id]
      );
      const role = result[0][0].role;
      if (role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admins only.",
        });
      }

      next();
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: err.message,
    });
  }
};
