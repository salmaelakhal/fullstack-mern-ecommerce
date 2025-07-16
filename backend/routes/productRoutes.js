const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// @route GET /api/products
// @desc Create a new Product
// @access Private,  // only admin can create a new product
router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user.id, //Reference to the admi user who created it
    });
      
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);

   
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;