const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));