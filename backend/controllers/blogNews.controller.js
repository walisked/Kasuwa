import mongoose from "mongoose";
import Blog from "../models/blogNews.model.js";

// Utility function to validate blog fields
const validateBlogFields = (blog) => {
  if (!blog.title || !blog.content) {
    return "Please provide both 'title' and 'content' fields.";
  }
  return null;
};

// GET: Fetch all blog posts
export const getBlogNews = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET: Fetch a single blog post by ID
export const getBlogNewsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid blog post ID" });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog post:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST: Create a new blog post
export const createBlogNews = async (req, res) => {
  const blog = req.body;
  const validationError = validateBlogFields(blog);

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  const newBlog = new Blog(blog);

  try {
    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Error creating blog post:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT: Update a blog post by ID
export const updateBlogNews = async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  // Validate the blog post ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid blog post ID" });
  }

  // Validate blog fields before updating
  const validationError = validateBlogFields(blog);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog post:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE: Remove a blog post by ID
export const deleteBlogNews = async (req, res) => {
  const { id } = req.params;

  // Validate the blog post ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid blog post ID" });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    res.status(200).json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
