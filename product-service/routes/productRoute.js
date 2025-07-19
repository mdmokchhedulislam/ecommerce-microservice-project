import express from "express";
const router = express.Router();

import { createProduct } from "../controller/ProductController.js";
import { upload } from "../utils/multer.js";

router.post("/create", upload.single("image"), createProduct);

export default router;
