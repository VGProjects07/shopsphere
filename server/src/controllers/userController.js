import { body } from "express-validator";
import { query } from "../models/query.js";

export const profileValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("phone").optional().trim()
];

export const getProfile = async (req, res, next) => {
  try {
    const rows = await query(
      "SELECT id, name, email, role, phone, avatar_url, created_at FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatarUrl } = req.body;
    await query("UPDATE users SET name = ?, phone = ?, avatar_url = ? WHERE id = ?", [
      name,
      phone || null,
      avatarUrl || null,
      req.user.id
    ]);
    res.json({ message: "Profile updated" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (_req, res, next) => {
  try {
    const rows = await query(
      "SELECT id, name, email, role, phone, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
