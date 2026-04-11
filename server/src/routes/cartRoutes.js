import { Router } from "express";
import { addToCart, cartValidation, getCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(protect);
router.get("/", getCart);
router.post("/", cartValidation, validate, addToCart);
router.delete("/:productId", removeFromCart);

export default router;
