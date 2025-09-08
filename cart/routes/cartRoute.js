import express from "express";
const router = express.Router();
import { addToCart,getCartItems } from "../controller/cartController.js";
import { auth } from "../middleware/verify.js";


router.post("/saveCart",auth, addToCart);
// router.get("/UpdateCartList/:cartID",findProduct);
// router.get("/RemoveCartList",ListByBrandService);
router.get("/CartList",auth, getCartItems);
export default router;
