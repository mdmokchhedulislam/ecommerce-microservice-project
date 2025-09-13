import axios from "axios";

export const auth = async (req, res, next) => {
  try {
    // token read from cookie or header
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    // console.log("Token from request:", token);

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Pass token in Authorization header
    const response = await axios.get(
      "http://www.mokchhedulislam.page.gd/api/auth/verify-token",
      {
        // headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      }
    );

    // console.log("Auth service response data:", response.data);

    if (response.data.valid) {
      req.user = response.data.user; 
      // console.log(req.user);
      
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.error(
      "Token verification error:",
      err.response?.data || err.message
    );
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};
