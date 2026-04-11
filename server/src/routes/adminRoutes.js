import { Router } from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect, requireAdmin);
router.get("/dashboard", getDashboardStats);

export default router;
