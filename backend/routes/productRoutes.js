const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// @route GET /api/products
// @desc Create a new Product
// @access Private,  // only admin can create a new product
router.post("/", protect,admin,  async (req, res) => {
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




// @route Put /api/products/:id
// @desc Update a Product
// @access Private,  // only admin can update a product

router.put("/:id", protect,admin, async (req, res) => {
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

      //Find product by ID
      const product = await Product.findById(req.params.id);

      if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.countInStock = countInStock || product.countInStock;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.collections = collections || product.collections;
        product.materials = materials || product.materials;
        product.gender = gender || product.gender;
        product.images = images || product.images;
          product.isFeatured =
              isFeatured !== undefined ? isFeatured : product.isFeatured; // Update isFeatured only if a new value is provided|| product.isFeatured;
        product.isPublished =
            isPublished !== undefined ? isPublished : product.isPublished;
        product.tags = tags || product.tags;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;
        product.sku = sku || product.sku;

        //   Save the updated product 
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
      

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" });
  }
});


// @route Delete /api/products/:id
// @desc Delete a Product
// @access Private,  // only admin can delete a product

router.delete("/:id", protect,admin, async (req, res) => {
    try {
      //Find the product by Id
    const product = await Product.findById(req.params.id);
        if (product) {
        // Remove the product from DB 
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error)
        res.status(500).send("Server error");
  }
});






module.exports = router;