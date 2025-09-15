
import jwt from "jsonwebtoken";


// Middleware to protect routes
export const isAuthenticate = (req, res, next) => {
  try {
    // Token can come from cookie or Authorization header
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      res.status(404).json({
        message:"token not found"
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mokchhedulislam");

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);

    // Return proper response for invalid or expired token
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    return res.status(401).json({ success: false, message: err.message || "Unauthorized" });
  }
};
