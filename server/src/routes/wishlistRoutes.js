import { Router } from "express";
import { getWishlist, toggleWishlist, wishlistValidation } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(protect);
router.get("/", getWishlist);
router.post("/", wishlistValidation, validate, toggleWishlist);

export default router;
