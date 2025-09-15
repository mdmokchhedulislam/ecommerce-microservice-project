import uploadOnCloudinary from "../utils/cloudinary.js";
import ProductModel from "../models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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

    const localPath = req?.file?.path;
    console.log(localPath);

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
      image, // here image = secure_url from cloudinary
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
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};

export const findProduct = async (req, res) => {
  try {
    const productData = await ProductModel.find();

    res.status(201).json({
      success: true,
      message: "find successfully",
      data: productData,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

export const ListByBrandService = async (req, res) => {
  try {
    const { brandid } = req.params;

    if (!ObjectId.isValid(brandid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid brand ID",
      });
    }

    let BrandID = new ObjectId(brandid);

    // let BrandID = req.params.brandid;
    // console.log(req.params.brandid);

    let MatchStage = { $match: { brandID: BrandID } };
    console.log("matching data is", MatchStage);
    console.log("matching data");
    

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    // Query
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

export const ListByCategoryService = async (req,res) => {
  try {
    
    let {categoryid} = req.params;
    console.log(categoryid);
    
    
    if (!ObjectId.isValid(categoryid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid brand ID",
      });
    }
   
    let CategoryID = new ObjectId(categoryid);

    let MatchStage = { $match: { categoryID: CategoryID } };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    console.log(data);
    
    res.status(200).json({
      status: "success", data: data

    })
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
