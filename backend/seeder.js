const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

// Connection to mongodb 
mongoose.connect(process.env.MONGO_URI)


// Function to seed data

const seedData = async () => {
    try {
      // Clear existing data
      await Product.deleteMany();
      await User.deleteMany();
      console.log("Data seeded successfully");
      //  process.exit();

      // Create a default admin user
      const createdUser = await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      });

      // Assign the default user ID to each product
      const userID = createdUser._id;

      const sampleProducts = products.map((product) => {
        return { ...product, user: userID };
      });

      // Insert the product into the database
      await Product.insertMany(sampleProducts);
      console.log("Data seeded successfully");
      process.exit();
    } catch (error) {
        console.log("Error seeding data", error);
        process.exit(1);
    }
}

seedData();