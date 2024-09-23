import express from "express"

import { createMovie,deleteMovie, getMovies, updateMovie } from "../controllers/movie.controller.js"

const router = express.Router();


  // GET: Fetch all Movie
  router.get("/", getMovies);
  
  // POST: Create a new Movie
  router.post("/", createMovie);
  
  // PUT: Update a Movie by ID
  router.put("/:id",updateMovie );
  
  // DELETE: Remove a Movie by ID
  router.delete("/:id", deleteMovie );

export default router