import express from "express";
import {
  getBlogNews,
  getBlogNewsById,
  createBlogNews,
  updateBlogNews,
  deleteBlogNews
} from "../controllers/blogNews.controller.js";

const router = express.Router();

// GET all blog news
router.get("/", getBlogNews);

// GET blog news by ID
router.get("/:id", getBlogNewsById);

// POST new blog news
router.post("/", createBlogNews);

// PUT update blog news by ID
router.put("/:id", updateBlogNews);

// DELETE blog news by ID
router.delete("/:id", deleteBlogNews);

export default router;
