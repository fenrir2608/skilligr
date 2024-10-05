import conn from "../helpers/connection.js";
import { createSecretToken } from "../helpers/secretToken.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await conn.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    const tk = req.cookies.token;

    if (tk) {
      return res.status(400).json({
      success: false,
      message: "Already logged in",
      });
    }

    if (result[0].length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const user = result[0][0];

    if (user.isDeleted === 1) {
      return res.status(400).json({
        success: false,
        message:
          "User account has been suspended. Please contact your administrator",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = createSecretToken(user.email);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: user.email,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      error: err.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, email, full_name, contact_no, dept, roll_no } =
      req.body;

    const existingUser = await conn.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );
    if (existingUser[0].length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await conn.query(
      `INSERT INTO users (username, password, email, full_name, contact_no, profile_img, isDeleted, role) VALUES (?, ?, ?, ?, ?, ?, 0, 'user')`,
      [username, hashedPassword, email, full_name, contact_no, "default.jpg"]
    );

    const userId = userResult[0].insertId;

    await conn.query(
      `INSERT INTO user_details (user_id, status, roll_no, dept, learning_paths, applied_jobs, is_deleted) VALUES (?, 0, ?, ?, '', '', 0)`,
      [userId, roll_no, dept]
    );

    const token = createSecretToken(email);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout.",
      error: err.message,
    });
  }
};

export const reset = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await conn.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (result[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email.",
      });
    }

    const user = result[0][0];
    const resetToken = await bcrypt.genSalt(10);
    const now = new Date();
    const msTime = new Date(now.getTime() + 1800000); // 1800000 ms = 30 minutes
    const resetTokenExpires = msTime.toISOString().slice(0, 19).replace('T', ' ');
    await conn.query(
      `UPDATE users SET reset_password_token = ?, reset_password_token_expires = ? WHERE email = ?`,
      [resetToken, resetTokenExpires, email]
    );
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "no-reply@skilligr.com",
      subject: "Password Reset | Skilligr",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${CLIENT_URL}/reset/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending email" });
      }
    });

    return res.status(200).json({
      success: true,
      message: "Password reset email sent.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: err.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const result = await conn.query(
      `SELECT * FROM users WHERE reset_password_token = ? AND reset_password_token_expires > ?`,
      [token, Date.now()]
    );

    if (result[0].length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    const user = result[0][0];

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await conn.query(
      `UPDATE users SET password = ?, reset_password_token = NULL, reset_password_token_expires = NULL WHERE id = ?`,
      [hashedPassword, user.id]
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: err.message,
    });
  }
};


export const viewUser = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await conn.query(`SELECT * FROM users WHERE id = ?`, [userId]);
    
    if (!user[0].length) {
      return res.status(404).json({
      success: false,
      message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user[0][0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user details",
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, role, roll_no, dept } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const fieldsToUpdate = {};
    if (role !== undefined && role !== "") fieldsToUpdate.role = role;
    if (roll_no !== undefined && roll_no !== "") fieldsToUpdate.roll_no = roll_no;
    if (dept !== undefined && dept !== "") fieldsToUpdate.dept = dept;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update.",
      });
    }

    const setClause = Object.keys(fieldsToUpdate)
      .map(field => `${field} = ?`)
      .join(', ');

    const values = Object.values(fieldsToUpdate);
    values.push(userId); 

    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    await conn.query(query, values);
    
    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: err.message,
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await conn.query(`UPDATE users SET isDeleted = 1 WHERE id = ?`, [userId]);

    return res.status(200).json({
      success: true,
      message: "User account suspended successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during account suspension",
      error: err.message,
    });
  }
};

export const activateUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await conn.query(`UPDATE users SET isDeleted = 0 WHERE id = ?`, [userId]);

    return res.status(200).json({
      success: true,
      message: "User account activated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during account activation",
      error: err.message,
    });
  }
};

// export const verify = async (req, res) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided. Please sign in.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.TOKEN_KEY);

//     const result = await conn.query(
//       `SELECT full_name FROM users WHERE email = ?`,
//       [decoded.id]
//     );

//     if (result[0].length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User verified successfully.",
//       full_name: result[0][0].full_name,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to verify token.",
//       error: err.message,
//     });
//   }
// };
