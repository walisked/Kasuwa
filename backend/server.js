import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import movieRoutes from "./routes/movie.route.js";
import blogNewsRoutes from "./routes/blogNews.route.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

 
// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/blog-news", blogNewsRoutes);

// Start the server
app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`);
});
