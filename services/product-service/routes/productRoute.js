import express from "express";
const router = express.Router();

import { createProduct, findProduct, ListByBrandService, ListByCategoryService } from "../controller/ProductController.js";
import { upload } from "../utils/multer.js";
import { createBrand, findBrand } from "../controller/brandController.js";
import { createCategory, findCategory } from "../controller/categoryController.js";
import { isAuthenticate } from "../middleware/verify.js";

router.post("/create",isAuthenticate, upload.single("image"), createProduct);
router.get("/find-product",isAuthenticate, findProduct);
router.get("/find-product/brand/:brandid",ListByBrandService);
router.get("/find-product/category/:categoryid",ListByCategoryService);
router.post("/brand", upload.single("brandImg"), createBrand);
router.get("/find-brand", findBrand);
router.post("/category", upload.single("categoryimg"), createCategory);
router.get("/find-category", findCategory);
export default router;
