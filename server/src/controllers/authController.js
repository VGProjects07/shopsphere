import bcrypt from "bcryptjs";
import crypto from "crypto";
import { body } from "express-validator";
import { query } from "../models/query.js";
import { ApiError } from "../utils/apiError.js";
import { signToken } from "../utils/jwt.js";

export const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];

export const resetRequestValidation = [
  body("email").isEmail().withMessage("Valid email is required")
];

export const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) {
      throw new ApiError(409, "Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const token = signToken({ id: result.insertId, email, role: "customer" });
    res.status(201).json({
      token,
      user: { id: result.insertId, name, email, role: "customer" }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const rows = await query(
      "SELECT id, name, email, password, role, phone, avatar_url FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatarUrl: user.avatar_url
      }
    });
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const rows = await query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (!rows[0]) {
      throw new ApiError(404, "User not found");
    }

    const token = crypto.randomBytes(20).toString("hex");
    await query(
      "UPDATE users SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?",
      [token, email]
    );

    res.json({
      message: "Password reset token generated",
      token
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const rows = await query(
      "SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW() LIMIT 1",
      [token]
    );
    if (!rows[0]) {
      throw new ApiError(400, "Reset token is invalid or expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
      [hashedPassword, rows[0].id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
