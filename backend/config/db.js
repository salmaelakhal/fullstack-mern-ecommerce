const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected successfully`);
  } catch (error) {
      console.log("Mongo connection failed.", error);
      process.exit(1);
  }
};

module.exports = connectDB;
