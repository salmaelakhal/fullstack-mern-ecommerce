const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();


// @route GET /api/orders/my-orders
// @desc Get logged in user orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({
            createdAt: -1,
        });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



// @route GET /api/orders/:id
// @desc Get order details by id
// @access Private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Return the full order detais
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});




module.exports = router;