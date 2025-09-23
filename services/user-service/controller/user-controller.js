

import { User } from "../models/userMode.js";
import  {ApiError} from "../utils/apiError.js";
import  ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

// =================== Register User ===================
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User with the same email already exists");
  }

  const localPath = req.file?.path;
  if (!localPath) {
    throw new ApiError(400, "Avatar not found");
  }

  const avatar = await uploadOnCloudinary(localPath);
  if (!avatar?.url) {
    throw new ApiError(500, "Error uploading avatar to Cloudinary");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    image: avatar.url,
  });

  const createdUser = await User.findById(user._id).select("-password");
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// =================== Login User ===================

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    throw new ApiError(400, "email and password  are required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user is not found in this server");
  }

  console.log(user);
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const token = await user.generateToken();
  const loggedInUser = await User.findById(user._id).select("-password");

  if (!loggedInUser) {
    throw new ApiError(500, "something went wrong ");
  }

  return res
    .status(200)
    .json({status:"success",loggedInUser, token, "message":"user login successfully"});
});



// =================== Find Profile ===================
const findProfile = async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    status: "success",
    user,
    message: "Profile fetched successfully",
  });
}




export {
  registerUser,
  loginUser,
  // logOut,
  // changeCurrentPassword,
  // getCurrentUser,
  // updateAccountDetails,
  // updateUserRole,
  findProfile,
  // verifyTokenFromCookie,
};
