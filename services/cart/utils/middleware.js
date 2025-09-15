
import jwt from "jsonwebtoken";


export const auth = async (req, res, next) => {
  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    
  }

  try {
    const decodedToken = jwt.verify(token, "mokchhedulislam");

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
};