import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  
  email: {  // Correct spelling here
    type: String,
    required: true,  // Validation error is happening because this field is missing in the request body
  },
  password: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
