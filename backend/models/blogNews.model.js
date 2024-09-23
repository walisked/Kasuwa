import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  }
}, 
{
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
