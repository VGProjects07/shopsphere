import { Router } from "express";
import {
  login,
  loginValidation,
  requestPasswordReset,
  resetPassword,
  resetPasswordValidation,
  resetRequestValidation,
  signup,
  signupValidation
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);
router.post("/password-reset/request", resetRequestValidation, validate, requestPasswordReset);
router.post("/password-reset/confirm", resetPasswordValidation, validate, resetPassword);

export default router;
