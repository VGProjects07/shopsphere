import { Router } from "express";
import { createReview, reviewValidation } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(protect);
router.post("/", reviewValidation, validate, createReview);

export default router;
