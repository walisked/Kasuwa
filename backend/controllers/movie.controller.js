import mongoose from "mongoose";
import Movie from "../models/movie.model.js"; // Ensure correct import

// Utility function to validate movie fields
const validateMovieFields = (movie) => {
  if (!movie.title || !movie.description || !movie.director || !movie.releaseDate || !movie.genre) {
    return "Please provide all required fields: title, description, director, releaseDate, and genre.";
  }
  return null;
};

// GET: Fetch all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST: Create a new movie
export const createMovie = async (req, res) => {
  const movie = req.body;

  // Validate movie fields
  const validationError = validateMovieFields(movie);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  const newMovie = new Movie(movie);

  try {
    await newMovie.save();
    res.status(201).json({ success: true, data: newMovie });
  } catch (error) {
    console.error("Error creating movie:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT: Update a movie by ID
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const movie = req.body;

  // Validate the movie ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid movie ID" });
  }

  // Validate movie fields before updating
  const validationError = validateMovieFields(movie);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, movie, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: updatedMovie });
  } catch (error) {
    console.error("Error updating movie:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE: Remove a movie by ID
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  // Validate the movie ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid movie ID" });
  }

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
