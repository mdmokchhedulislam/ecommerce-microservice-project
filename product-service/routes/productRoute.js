import express from "express";
const router = express.Router();

import { createProduct, findProduct } from "../controller/ProductController.js";
import { upload } from "../utils/multer.js";

router.post("/create", upload.single("image"), createProduct);
router.get("/find-product", findProduct);
export default router;
