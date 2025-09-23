import jwt from "jsonwebtoken";

export const isAuthenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("authheader", authHeader);
    
    if (!authHeader) {
      console.log(" Authorization header not found");
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log(" Token not found in header");
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded user:", decoded);
    req.user = decoded;

    next();
  } catch (err) {
    console.log(" Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
