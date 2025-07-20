const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all order (admin only)
// @acess Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route PUT /api/admin/orders/:id
// @desc Update order to delivered (admin only)
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status; 
            order.isDelivered =
                req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt =
                req.body.status === "Delivered" ?
                    Date.now() : order.deliveredAt;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route Delete /api/admin/orders/:id
// @desc Delete order (admin only)
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});




module.exports = router;