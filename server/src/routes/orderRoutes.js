import { Router } from "express";
import {
  checkoutValidation,
  getAllOrders,
  getOrders,
  placeOrder,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(protect);
router.get("/", getOrders);
router.post("/checkout", checkoutValidation, validate, placeOrder);
router.get("/admin/all", requireAdmin, getAllOrders);
router.patch("/admin/:id/status", requireAdmin, updateOrderStatus);

export default router;
