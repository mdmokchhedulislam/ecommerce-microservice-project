import express from "express";
const router = express.Router();

import { upload } from "../utils/multer.js";
import { createCategory, findCategory } from "../controller/categoryController.js";

router.post("/category", upload.single("categoryimg"), createCategory);
router.get("/find-category", findCategory);

export default router;
