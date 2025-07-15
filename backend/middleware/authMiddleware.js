const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Middleware to protect routes

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (error) {
      console.log("Token verification failed", error);
      res.status(401).json({ message: "Not authorized, token failed" });
      // res.status(401);
      // throw new Error("Not authorized");
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
    // res.status(401);
    // throw new Error("Not authorized");
  }
};

module.exports = { protect };
