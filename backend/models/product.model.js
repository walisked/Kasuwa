import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {  // Correct spelling here
    type: String,
    required: true,  // Validation error is happening because this field is missing in the request body
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
