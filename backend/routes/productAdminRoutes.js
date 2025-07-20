const express = require("express");
const Product = require("../models/Product");
const {protect,admin} = require("../middleware/authMiddleware");
const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products
// @access Private,  // only admin can get all products
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
    
module.exports = router;