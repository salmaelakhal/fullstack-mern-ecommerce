const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// @route PUT /api/products
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
      material,
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
      material,
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
      material,
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
        product.material = material || product.material;
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


// @route Get /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async (req, res) => {
  try {
      const {
          collection, 
          size,
          color, 
          gender, 
          minPrice,
          maxPrice,
          sortBy,
          search,
          category, 
          material, 
          brand, 
          limit, 
      } = req.query;

      let query = {}

      //   Filter logic 
      if (collection && collection.toLocaleLowerCase() !== "all") {
          query.collections = collection;
      }

      if (category && category.toLocaleLowerCase() !== "all") {
          query.category = category;
      }

      if (material) {
          query.material = { $in: material.split(",") } 
      }

      if (brand) {
          query.brand = { $in: brand.split(",") } 
      }

      if (size) {
          query.sizes = { $in: size.split(",") } 
      }

      if (color) {
          query.colors = { $in: [color] } 
      }

      if (gender) {
          query.gender = gender;
      }

      if (minPrice || maxPrice) {
          query.price = {}
          if (minPrice) {
              query.price.$gte = Number(minPrice);
          }
          if (maxPrice) {
              query.price.$lte = Number(maxPrice);
          }
      }

      if (search) {
          query.$or = [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
          ]
    }

      //   Sort Logic
      let sort = {}
      if (sortBy) {
          switch (sortBy) {
              case "priceAsc":
                  sort = { price: 1 };
                  break;
              case "priceDesc":
                  sort = { price: -1 };
                  break;
              case "popularity":
                  sort = { rating: -1 };
                  break;
              default:
                  break;
          }
      }

      //   Fetch products and apply sorting and limit 
      let products = await Product.find(query)
          .sort(sort).
          limit(Number(limit) || 0);
      
      res.status(200).json(products);

  } catch (error) {
    console.error(error)
    res.status(500).send("Server error");
  }
});
   

// @route Get /api/products/best-sellers
// @desc Retrieve the best selling products
// @access Public
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.status(200).json(bestSeller);
        } else {
            res.status(404).json({ message: "No best sellers found" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error");
    }
})


//  
// @route Get /api/products/:id
// @desc Get a single product by Id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error");
  }
});


// @route Get /api/products/similar/:id
// @desc Retrieve similar products based on the current product's geneder and category
// @access Public
router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }

        const similarProducts = await Product.find({
            _id: { $ne: id },
            category: product.category,
            gender: product.gender,
        }).limit(4);

        res.status(200).json({
            similarProducts
        })


    } catch (error) {
        console.error(error)
        res.status(500).send("Server error");
    }
    });




module.exports = router;