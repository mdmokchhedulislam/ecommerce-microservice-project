import express from "express";
const router = express.Router();
import { addToCart,getCartItems,updateCartItem,removeCartItem } from "../controller/cartController.js";
import { auth } from "../middleware/verify.js";


router.post("/saveCart",auth, addToCart);
router.get("/UpdateCartList/:cartID",auth, updateCartItem);
router.get("/RemoveCartList",auth,removeCartItem);
router.get("/CartList",auth, getCartItems);
export default router;
