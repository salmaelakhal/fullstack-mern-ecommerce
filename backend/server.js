const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("WELCOME TO MERNIFY API!")
});

// API Routes 
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});