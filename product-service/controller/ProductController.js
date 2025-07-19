
import uploadOnCloudinary from "../utils/cloudinary.js"
import ProductModel from "../models/productModel.js"


export const createProduct = async (req, res) => {
  try {
    const {
      title,
      shortDes,
      price,
      discount,
      discountPrice,
      star,
      stock,
      remark,
      categoryID,
      brandID,
    } = req.body;

    const localPath = req.file?.path;
    const uploadResults = await uploadOnCloudinary(localPath);

    if (!uploadResults) {
      return res.status(500).json({
        success: false,
        message: "Image upload to Cloudinary failed",
      });
    }

    // Use the URL from Cloudinary upload for the product image
    const image = uploadResults.secure_url;

    const product = await ProductModel.create({
      title,
      shortDes,
      price,
      discount,
      discountPrice,
      image,  // here image = secure_url from cloudinary
      star,
      stock,
      remark,
      categoryID,
      brandID,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};
