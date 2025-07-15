const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

// @route Post /api/users/register
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //   Register logic
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
    });
    await user.save();

      //   Create JWT Payload 
      const payload = { user: { id: user.id, role: user.role } };
      
      // Sign and return the token along with user data
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '15d' },
        (err, token) => {
            if (err) throw err;

            // send the usrt and token in response 
            res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            });
        }
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error" + { message: error.message });
  }
});


// @route POST /api/users/login
// @desc Authentificate a user
// @access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    try {
    //   Find the user by email 
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      
      //   Check if the password is correct
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      
      //   Create JWT Payload 
      const payload = { user: { id: user.id, role: user.role } };
      
      // Sign and return the token along with user data
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '15d' },
        (err, token) => {
            if (err) throw err;

            // send the usrt and token in response 
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            });
        }
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error" + { message: error.message });
  }
});


// @route Get /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);

});








module.exports = router;
