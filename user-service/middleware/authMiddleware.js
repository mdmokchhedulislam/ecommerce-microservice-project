
// import { ApiError } from "../utils/apiError.js";
// import jwt from "jsonwebtoken";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../models/userMode.js";

// export const isAuthenticate = asyncHandler(async (req, res, next) => {

//   let token;
//   if (req.cookies?.token) {
//     token = req.cookies.token;
//   } else {
//     const authHeader = req.header["token"];
//     if (!authHeader?.startsWith("Bearer ")) {
//       throw new ApiError(401, "Invalid authorization header");
//     }
//     token = authHeader.split(" ")[1];
//   }

//   if (!token) {
//     throw new ApiError(401, "Unauthorized request");
//   }

//   try {
 
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


//     const userId = decodedToken?._id;
//     if (!userId) throw new ApiError(401, "Invalid token payload");

//     const user = await User.findById(userId).select("-password");
//     if (!user) throw new ApiError(401, "User not found");

//     req.user = user;
//     next();
//   } catch (err) {
//     throw new ApiError(401, err.message || "Invalid or expired token");
//   }
// });


import jwt from "jsonwebtoken"

 export const isAuthenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("token is", token);
  

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "mokchhedulislam");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

// export default isAuthenticate