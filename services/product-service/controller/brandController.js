
import BrandModel from "../models/brandModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js"



export const createBrand = async (req, res) => {
  try {
    const {brandName} = req.body;
    console.log("brand name is ", brandName);
    

    const localPath = req.file?.path;
    const brandimage = await uploadOnCloudinary(localPath);

    if (!brandimage) {
      return res.status(500).json({
        success: false,
        message: "Image upload to Cloudinary failed",
      });
    }

    // Use the URL from Cloudinary upload for the product image
    const brandImg = brandimage.secure_url;

    const Brand = await BrandModel.create({
     brandName,
     brandImg
    
    });
    res.status(201).json({
      success: true,
      message: "brand create successfully",
      data: Brand,
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      success: false,
      message: "brand creation failed",
      error: error.message,
    });
  }
};


export const findBrand = async (req, res) => {
  try {

    const brandData = await BrandModel.find();


    
    res.status(201).json({
      success: true,
      message: "find successfully",
      data: brandData,
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      success: false,
      message: "brand data find failed",
      error: error.message,
    });
  }
};

