import { body } from "express-validator";
import { query } from "../models/query.js";

export const reviewValidation = [
  body("productId").isInt().withMessage("productId is required"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment").trim().notEmpty().withMessage("Comment is required")
];

export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    await query(
      "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)",
      [req.user.id, productId, rating, comment]
    );

    await query(
      `
        UPDATE products
        SET rating = (
          SELECT AVG(rating) FROM reviews WHERE product_id = ?
        ),
        review_count = (
          SELECT COUNT(*) FROM reviews WHERE product_id = ?
        )
        WHERE id = ?
      `,
      [productId, productId, productId]
    );

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    next(error);
  }
};
