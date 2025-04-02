const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const businessRoutes = require("./routes/businessRoutes");

// Use business routes
app.use("/api/businesses", businessRoutes);

// Connect to database
connectDB();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get("/", (req, res) => {
  res.send("Business Directory API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
