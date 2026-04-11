import { body } from "express-validator";
import { query } from "../models/query.js";

export const wishlistValidation = [
  body("productId").isInt().withMessage("productId is required")
];

export const getWishlist = async (req, res, next) => {
  try {
    const items = await query(
      `
        SELECT p.id, p.name, p.slug, p.price, p.image_url, p.rating
        FROM wishlist w
        JOIN products p ON p.id = w.product_id
        WHERE w.user_id = ?
      `,
      [req.user.id]
    );
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const existing = await query(
      "SELECT user_id FROM wishlist WHERE user_id = ? AND product_id = ? LIMIT 1",
      [req.user.id, productId]
    );

    if (existing[0]) {
      await query("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [req.user.id, productId]);
      return res.json({ wished: false });
    }

    await query("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)", [req.user.id, productId]);
    res.status(201).json({ wished: true });
  } catch (error) {
    next(error);
  }
};
