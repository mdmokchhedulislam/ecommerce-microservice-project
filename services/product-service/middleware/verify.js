import axios from "axios";

const authMiddleware = async (req, res, next) => {
  try {
    // Forward cookie from incoming request to auth service
    const response = await axios.get("http://www.mokchhedulislam.page.gd:3000/api/auth/verify", {
      headers: {
        Cookie: req.headers.cookie || "", // browser থেকে cookie forward করা
      },
    });

    console.log("Auth service response:", response.data);

    if (response.data.valid) {
      req.user = response.data.user; // attach user info
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
