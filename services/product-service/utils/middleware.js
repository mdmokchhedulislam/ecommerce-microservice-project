// middlewares/verifyToken.js
import jwt from "jsonwebtoken";

export const midware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("token form header", authHeader);
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // same secret
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
