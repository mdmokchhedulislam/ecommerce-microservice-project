import multer from "multer";
import path from "path";
import fs from "fs";

// 📂 upload ফোল্ডার না থাকলে তৈরি করো
const uploadPath = "upload";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// 📦 Multer স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // upload ফোল্ডারে সেভ হবে
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "image-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// ✅ Multer export
export const upload = multer({ storage });
