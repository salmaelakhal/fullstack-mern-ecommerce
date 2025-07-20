const express = require("express");
const router = express.Router();

const Subscribe = require("../models/Subscriber");


// @route POST /api/subscribe
// @desc handle newsletter subscription
// @access Public
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // check if the email is already subscribed
        let subscribe = await Subscribe.findOne({ email });
        if (subscribe) {
            return res.status(400).json({ message: "Email already subscribed" });
        }
        // create a new subscribe
        subscribe = new Subscribe({ email });
        await subscribe.save();
        res.status(201).json({ message: "Subscribed successfully" });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;