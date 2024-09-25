import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user
export const registerUser = async (req, res) => {
    const { username, fullName, password, address, state, nationality, localGovernment, phoneNumber, NiN, dateOfBirth } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const user = await User.create({
            username,
            fullName,
            password, // Ensure you hash the password before saving it
            address,
            state,
            nationality,
            localGovernment,
            phoneNumber,
            NiN,
            dateOfBirth,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                token: generateToken(user._id),
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/auth/login
// @desc    Login a user and get a token
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                token: generateToken(user._id),
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin CRUD Operations

// @route   GET /api/users
// @desc    Get all users (Admin only)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /api/users/:id
// @desc    Update user details (Admin only)
export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.address = req.body.address || user.address;
            user.state = req.body.state || user.state;
            user.nationality = req.body.nationality || user.nationality;
            user.localGovernment = req.body.localGovernment || user.localGovernment;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.NiN = req.body.NiN || user.NiN;
            user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                fullName: updatedUser.fullName,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   DELETE /api/users/:id
// @desc    Delete a user (Admin only)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
