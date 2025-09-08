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





export const getCartItems = async (req, res) => {
  try {
    const user_id = req.user._id;

    const matchStage = { $match: { userID: new ObjectID(user_id) } };
    const JoinStageProduct = {
      $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" },
    };
    const unwindProductStage = { $unwind: "$product" };

    const JoinStageBrand = {
      $lookup: { from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand" },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const JoinStageCategory = {
      $lookup: { from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category" },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    const data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to fetch cart", error: error.message });
  }
};






export const updateCartItem = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { cartID } = req.params;
    const { qty, color, size } = req.body;

    const updated = await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: { qty, color, size } }
    );

    res.status(200).json({ success: true, message: "Cart item updated", updated });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to update cart", error: error.message });
  }
};





