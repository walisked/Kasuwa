import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js"

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

app.use("/api/products", productRoutes)

// Start the server
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
