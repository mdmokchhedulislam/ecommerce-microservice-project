import express from "express";
const router = express.Router();

import { createProduct, findProduct, ListByBrandService, ListByCategoryService } from "../controller/ProductController.js";
import { upload } from "../utils/multer.js";


router.post("/create", upload.single("image"), createProduct);
router.get("/find-product",findProduct);
router.get("/find-product/brand/:brandid",ListByBrandService);
router.get("/find-product/category/:categoryid",ListByCategoryService);
export default router;
