import express from "express";
const router = express.Router();

import { upload } from "../utils/multer.js";
import { createBrand, findBrand } from "../controller/brandController.js";

router.post("/brand", upload.single("brandImg"), createBrand);
router.get("/find-brand", findBrand);

export default router;
