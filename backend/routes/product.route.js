import express from 'express'

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Utility function to validate product fields
const validateProductFields = (product) => {
    if (!product.name || !product.image) {
      return "Please provide both 'name' and 'image' fields.";
    }
    return null;
  };
  
  // GET: Fetch all products
  router.get("/", getProducts);
  
  // POST: Create a new product
  router.post("/", createProduct);
  
  // PUT: Update a product by ID
  router.put("/:id",updateProduct );
  
  // DELETE: Remove a product by ID
  router.delete("/:id", deleteProduct );

export default router