import mongoose from "mongoose";

// Define the schema correctly
const movieSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    describtion: {
      type : String,
      require : true,  
    },
    price: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
},
{
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create the model using the schema
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
