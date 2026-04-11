import { Router } from "express";
import { getAllUsers, getProfile, profileValidation, updateProfile } from "../controllers/userController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, profileValidation, validate, updateProfile);
router.get("/", protect, requireAdmin, getAllUsers);

export default router;
