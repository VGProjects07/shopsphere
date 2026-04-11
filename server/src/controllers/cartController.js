import { body } from "express-validator";
import { query } from "../models/query.js";

export const cartValidation = [
  body("productId").isInt().withMessage("productId is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1")
];

export const getCart = async (req, res, next) => {
  try {
    const items = await query(
      `
        SELECT c.id, c.quantity, p.id AS product_id, p.name, p.slug, p.price, p.image_url, p.stock
        FROM cart_items c
        JOIN products p ON p.id = c.product_id
        WHERE c.user_id = ?
      `,
      [req.user.id]
    );
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    await query(
      `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
      `,
      [req.user.id, productId, quantity]
    );
    res.status(201).json({ message: "Cart updated" });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    await query("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?", [
      req.user.id,
      req.params.productId
    ]);
    res.json({ message: "Removed from cart" });
  } catch (error) {
    next(error);
  }
};
