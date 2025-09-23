import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticate = (req, res, next) => {
  try {
    // console.log("auth is running");
    console.log("token is", req.cookies?.token);
    
    
    let token=req.headers?.token
    if(!token){
        token=req.cookies?.token
    }
  // console.log("token is", token);
  
    if (!token) {
      throw new ApiError(401, "Unauthorized: Token not found need to authorized");
    }
    const decoded = jwt.verify(token, mokchhedul);
    // console.log('decoded form auth', decoded);
    
    let email = decoded?.email;
    let user_id = decoded?._id;
    req.headers.email=email;
    req.headers.user_id=user_id
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
