const ProductModel = require('../models/product')
const cloudinary = require("cloudinary");


//Setup
cloudinary.config({
  cloud_name: "dhapn8l2b",
  api_key: "284551959953545",
  api_secret: "eUDsNU2FHklBvTrr4lW77egRYDI",
});

class ProductController {

  static productInsert = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;

    // image upload
    const file = req.files.image;
    const imageUpload = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "userprofile",
      }
    );

    // Save product with (public_id and url)
    const result = await ProductModel.create({
      name,
      price,
      description,
      quantity,
      image: {
        public_id: imageUpload.public_id,
        url: imageUpload.secure_url,
      },
    });

    return res.status(201).json({
      message: "Data Inserted Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", error });
  }
};


  static productDisplay = async (req, res) => {
    try {
      const product = await ProductModel.find();
      return res.status(200).json({
        success: true,
        message: "Data Displayed Successfully",
        product,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static productView = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);
      return res.status(200).json({
        success: true,
        message: "Data Displayed Successfully",
        product,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static productDelete = async (req, res) => {
      try {
        const  id  = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);
        return res.status(200).json({
          success: true,
          message: "Data Deleted Successfully",
          product,
        });
      } catch (error) {
        console.log(error);
      }
    };
  


}

module.exports = ProductController