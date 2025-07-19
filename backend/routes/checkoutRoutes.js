const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const route = express.Router();


// @route POST /api/checkout
// @desc Create a new Checkout
// @access Private
route.post('/', protect, async (req, res) => {
    const { checkoutItems, shippingAddress, payementMethod, totalPrice } =
        req.body;
    
    if (!checkoutItems || checkoutItems.length === 0) {
        res.status(400).json({ message: "No checkout items found" });
        return;
    }

    try {
        // Create a new checkout
        const newCheckout = await Checkout.create({
            user: req.user.id,
            CheckoutItems: checkoutItems,
            shippingAddress,
            payementMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user ${req.user.id}`);
        res.status(201).json(newCheckout);
    }catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ message: "Server error" });
    }

})


// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after  succesful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if(paymentStatus === "Paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid payment status" });
        }
    } catch (error) {
        console.error("Error updating checkout:", error);
        res.status(500).json({ message: "Server error" });
    }
  
});


// @toute POST /api/checkout/:id/finalize
// @desc Finalize checkout and covert cart to order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if(checkout.isPaid && !checkout.isFinalized) {
            // Create final order based on the checkout details
            const finalOrder = await Order.create ({
                user: checkout.user,
                orderItems: checkout.CheckoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.payementMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });
// Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
// delete  the cart associated with the user
            res.status(201).json(finalOrder);
        } else if(checkout.isFinalized) {
            res.status(400).json({ message: "Checkout has already been finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid yet" });
        }
    } catch (error) {
        console.error("Error finalizing checkout:", error);
        res.status(500).json({ message: "Server error" });
    }

});

module.exports = router

