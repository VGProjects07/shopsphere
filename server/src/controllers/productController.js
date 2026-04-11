import { body } from "express-validator";
import { query } from "../models/query.js";
import { ApiError } from "../utils/apiError.js";
import {
  getCategories,
  getProductBySlug,
  getRecommendations,
  listProducts
} from "../services/productService.js";

export const productValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("brand").trim().notEmpty().withMessage("Brand is required"),
  body("categoryId").isInt().withMessage("categoryId must be a number"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be positive"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be zero or more"),
  body("imageUrl").isURL().withMessage("imageUrl must be a valid URL"),
  body("description").trim().notEmpty().withMessage("Description is required")
];

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getProducts = async (req, res, next) => {
  try {
    const products = await listProducts(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const reviews = await query(
      `
        SELECT r.id, r.rating, r.comment, r.created_at, u.name
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        WHERE r.product_id = ?
        ORDER BY r.created_at DESC
      `,
      [product.id]
    );

    const recommendations = await getRecommendations(product.id);
    res.json({ ...product, reviews, recommendations });
  } catch (error) {
    next(error);
  }
};

export const getProductSuggestions = async (req, res, next) => {
  try {
    const term = req.query.q || "";
    const suggestions = await query(
      "SELECT id, name, slug FROM products WHERE name LIKE ? ORDER BY rating DESC LIMIT 6",
      [`%${term}%`]
    );
    res.json(suggestions);
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      categoryId,
      price,
      stock,
      imageUrl,
      description,
      discountPercent = 0,
      featured = false
    } = req.body;

    const slug = slugify(name);
    const result = await query(
      `
        INSERT INTO products
        (category_id, name, slug, brand, description, price, discount_percent, stock, image_url, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [categoryId, name, slug, brand, description, price, discountPercent, stock, imageUrl, featured ? 1 : 0]
    );

    res.status(201).json({ id: result.insertId, slug });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      categoryId,
      price,
      stock,
      imageUrl,
      description,
      discountPercent = 0,
      featured = false
    } = req.body;

    await query(
      `
        UPDATE products
        SET category_id = ?, name = ?, slug = ?, brand = ?, description = ?, price = ?, discount_percent = ?, stock = ?, image_url = ?, featured = ?
        WHERE id = ?
      `,
      [
        categoryId,
        name,
        slugify(name),
        brand,
        description,
        price,
        discountPercent,
        stock,
        imageUrl,
        featured ? 1 : 0,
        req.params.id
      ]
    );

    res.json({ message: "Product updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
