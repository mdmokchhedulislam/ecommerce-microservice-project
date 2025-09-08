import { User } from "../models/userMode.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    throw new ApiError(400, "all fields are required");
  }

  //3rd
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User with the same email already exists");
  }

  const localPath = req.file?.path;

  if (!localPath) {
    throw new ApiError(400, "avatar not found");
  }

  const avatar = await uploadOnCloudinary(localPath);

  if (!avatar) {
    throw new ApiError(400, "avatar from cludinar not found");
  }

  const user = await User.create({
    name: name,
    email,
    password,
    phone,
    image: avatar.url,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "data not found, something went wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "user Registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("login site");

  const { email, password } = req.body;
  console.log(email);

  console.log("data find fail");

  if (!email || !password) {
    throw new ApiError(400, "email and password  are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user is not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const token = await user.generateToken();
  console.log("token in loging page", token);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedInUser) {
    throw new ApiError(500, "something went wrong ");
  }

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
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

const logOut = asyncHandler(async (req, res) => {
  res.cookie("token", "").status(200).json({
    message: "user logout successfully",
  });
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword != confirmPassword) {
    throw new ApiError(401, "confirmPassword isn't match with newpassword");
  }

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName && !email) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },
    {
      new: true,
    }
  ).select("-password ");

  if (!user) {
    throw new ApiError(500, "something went wrong in server");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { role } = req.body;

  console.log("Received user ID:", _id, "and role:", role);

  if (!role) {
    return res.status(400).json({ message: "Role is required." });
  }
  if (!["user", "seller"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  console.log("Current role:", user.role);
  user.role = role;

  try {
    await user.save();
    console.log("Updated role successfully:", user.role);
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Failed to update role." });
  }

  return res.status(200).json({
    message: "Role updated successfully",
    updatedUser: user,
  });
});

// controllers/authController.js
import jwt from "jsonwebtoken";

export const verifyTokenFromCookie = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token found" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "mokchhedulislam");
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
};

// const updateUserAvatar = asyncHandler(
//     async (req, res) => {
//         const avatarLocalPath = req.file?.path

//         if (!avatarLocalPath) {
//             throw new ApiError(404, "avatar file is not send")
//         }

//         const avatar = await uploadOnCloudinary(avatarLocalPath)

//         if (!avatar.url) {
//             throw new ApiError(500, "Error while uploading avatar on cloudinary")
//         }

//         const user = await User.findByIdAndUpdate(
//             req.user._id,
//             {
//                 $set: {
//                     avatar: avatar.url
//                 }
//             }, {
//             new: true
//         }
//         ).select("-password -refreshToken ")

//         if (!user) {
//             throw new ApiError(500, "something went wrong in server")
//         }

//         return res
//             .status(200)
//             .json(
//                 new ApiResponse(200, user, "avatar file uploaded successfully")
//             )

//     }
// )

// const updateUserRole = asyncHandler(async (req, res) => {
//     const {_id} = req.user
//     const { role } = req.body;

//     console.log("user id is", _id, "role is", role);

//     const user = await User.findById(_id);
//     console.log("user is ", user);

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//      user.role = role;
//     await user.save();

//     console.log(user);

//     console.log("user is ", user);
//     return res.status(200).json({
//       message: "role updated successfully",
//       updatedUser: user,
//     });
//   });

export {
  registerUser,
  loginUser,
  logOut,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserRole,
};
