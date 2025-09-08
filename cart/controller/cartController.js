import CartModel from "../models/cartModel.js";
import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;


export const addToCart = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { productID, qty, color, size } = req.body;

    // check if same product with same color & size exists
    const existing = await CartModel.findOne({
      userID: user_id,
      productID,
      color,
      size,
    });

    if (existing) {
      existing.qty += qty; // increase quantity
      await existing.save();
    } else {
      await CartModel.create({ userID: user_id, productID, qty, color, size });
    }

    res.status(201).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to add product", error: error.message });
  }
};
