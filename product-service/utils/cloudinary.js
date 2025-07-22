import fs from "fs";
import { v2 as cloudinary } from "cloudinary"; // ✅ ঠিকমত import

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dn5llg9d2",
  api_key: process.env.CLOUDINARY_API_KEY || "645463629883328",
  api_secret: process.env.CLOUDINARY_API_SECRET || "cZzuvUFGNwf8Vkc2YtSGquEP5FY",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("No file path provided");

    if (!fs.existsSync(localFilePath)) {
      console.error("❌ File does not exist at:", localFilePath);
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // Delete local file
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCloudinary;
