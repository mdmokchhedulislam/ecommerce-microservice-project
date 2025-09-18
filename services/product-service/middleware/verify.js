import axios from "axios";

const authMiddleware = async (req, res, next) => {
  try {
    // Read token from cookie
    const token = req.cookies?.token;

    console.log("Token from cookie:", token);

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Send token to auth service for verification (GET request)
    const response = await axios.get(
      "http://localhost:3000/api/auth/verify",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log("Auth service response:", response.data);

    if (response.data.valid) {
      req.user = response.data.user; // attach user info to request
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error("Token verification error:", err.response?.data || err.message);
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

export default authMiddleware;
