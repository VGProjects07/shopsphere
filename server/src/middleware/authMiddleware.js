import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

export const protect = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (_error) {
    next(new ApiError(401, "Invalid token"));
  }
};

export const requireAdmin = (req, _res, next) => {
  if (req.user?.role !== "admin") {
    return next(new ApiError(403, "Admin access required"));
  }
  next();
};
