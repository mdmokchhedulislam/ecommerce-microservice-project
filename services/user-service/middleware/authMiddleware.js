import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new ApiError(401, "Unauthorized: Token not found");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Access token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    return res.status(401).json({ success: false, message: err.message || "Unauthorized" });
  }
};
