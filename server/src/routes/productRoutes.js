import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllCategories,
  getProduct,
  getProducts,
  getProductSuggestions,
  productValidation,
  updateProduct
} from "../controllers/productController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getProducts);
router.get("/categories/all", getAllCategories);
router.get("/suggestions/live", getProductSuggestions);
router.get("/:slug", getProduct);
router.post("/", protect, requireAdmin, productValidation, validate, createProduct);
router.put("/:id", protect, requireAdmin, productValidation, validate, updateProduct);
router.delete("/:id", protect, requireAdmin, deleteProduct);

export default router;
