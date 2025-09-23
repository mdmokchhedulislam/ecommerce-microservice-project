import { User } from "../models/userMode.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
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

  const options = {
    httpOnly: true, 
    secure: false, 
    sameSite: "lax", 
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          token,
        },
        "user logged in successfully"
      )
    );
});

const verifyTokenFromCookie = async (req, res) => {
  try {
    // console.log("verify running");

    const token =
      req.cookies?.token ||
      req.headers["authorization"]?.replace("Bearer ", "");

    console.log("verify token is", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?._id) throw new ApiError(401, "Invalid token");

    const user = await User.findById(decoded._id).select("-password");
    if (!user) throw new ApiError(401, "User not found");
    res.status(200).json({ valid: true, user });
  } catch (err) {
    res
      .status(401)
      .json({
        valid: false,
        message: err.message || "Invalid or expired token",
      });
  }
};

const logOut = asyncHandler(async (req, res) => {
  res.cookie("token", "").status(200).json({
    message: "user logout successfully",
  });
});

// =================== Find Profile ===================
const findProfile = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const user = await User.findById(user_id).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

// =================== Change Current Password ===================
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    throw new ApiError(401, "Confirm password doesn't match with new password");
  }

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

// =================== Get Current User ===================
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

// =================== Update Account Details ===================
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName && !email) throw new ApiError(400, "All fields are required");

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: fullName, email } },
    { new: true }
  ).select("-password");

  if (!user) throw new ApiError(500, "Something went wrong in server");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

// =================== Update User Role ===================
const updateUserRole = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { role } = req.body;

  if (!role) throw new ApiError(400, "Role is required");
  if (!["user", "seller"].includes(role))
    throw new ApiError(400, "Invalid role specified");

  const user = await User.findById(_id);
  if (!user) throw new ApiError(404, "User not found");

  user.role = role;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Role updated successfully"));
});

// =================== Verify Token from Header ===================

export {
  registerUser,
  loginUser,
  logOut,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserRole,
  findProfile,
  verifyTokenFromCookie,
};
