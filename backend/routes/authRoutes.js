import express from 'express';
import {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/authController.js'
import { protect, admin } from '../middleware/authMiddleware.js'; // Ensure you're using ES module syntax here

const router = express.Router();

// User registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin routes for managing users
router.route('/')
    .get(protect, admin, getUsers); // Get all users (admin only)
    
router.route('/:id')
    .put(protect, admin, updateUser) // Update user by ID (admin only)
    .delete(protect, admin, deleteUser); // Delete user by ID (admin only)

export default router;
