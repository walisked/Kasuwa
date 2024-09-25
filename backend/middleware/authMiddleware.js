import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.model.js'; // Adjusted import to match actual file name

// Middleware to protect routes by verifying the JWT
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get the user associated with the token and exclude the password field
            req.user = await User.findById(decoded.id).select('-password');

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(401); // Set HTTP status to Unauthorized
            throw new Error('Not authorized, token failed'); // Throw an error
        }
    } else {
        // If no token is present in the Authorization header
        res.status(401); // Set HTTP status to Unauthorized
        throw new Error('Not authorized, no token'); // Throw an error
    }
});

// Middleware to check if the logged-in user has admin privileges
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        // Proceed to the next middleware or route handler if user is an admin
        next();
    } else {
        // If the user is not an admin
        res.status(401); // Set HTTP status to Unauthorized
        throw new Error('Not authorized as an admin'); // Throw an error
    }
};

export { protect, admin };
