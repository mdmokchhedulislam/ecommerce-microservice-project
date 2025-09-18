import express from "express";
const router = express.Router();
import { addToCart,getCartItems,updateCartItem,removeCartItem } from "../controller/cartController.js";
import { auth } from "../middleware/verify.js";


router.post("/saveCart", addToCart);
router.get("/UpdateCartList/:cartID", updateCartItem);
router.get("/RemoveCartList",removeCartItem);
router.get("/CartList", getCartItems);
export default router;
