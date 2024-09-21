import mongoose from "mongoose";

// Define the schema correctly
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
},
{
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create the model using the schema
const Product = mongoose.model('Product', productSchema);

export default Product;
