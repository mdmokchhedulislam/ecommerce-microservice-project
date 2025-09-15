
import CategoryModel from "../models/categoryModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js"



export const createCategory = async (req, res) => {
  try {
    const {categoryName} = req.body;

    const localPath = req.file?.path;
    const categoryImage = await uploadOnCloudinary(localPath);

    if (!categoryImage) {
      return res.status(500).json({
        success: false,
        message: "Image upload to Cloudinary failed",
      });
    }

    // Use the URL from Cloudinary upload for the product image
    const categoryImg = categoryImage.secure_url;

    const category = await CategoryModel.create({
     categoryName,
     categoryImg
    
    });
    res.status(201).json({
      success: true,
      message: "category create successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      success: false,
      message: "category creation failed",
      error: error.message,
    });
  }
};



// find Category


export const findCategory = async (req, res) => {
  try {

    const CategoryData = await CategoryModel.find();


    
    res.status(201).json({
      success: true,
      message: "find successfully",
      data: CategoryData,
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      success: false,
      message: "category data find failed",
      error: error.message,
    });
  }
};
