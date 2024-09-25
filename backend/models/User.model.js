import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema with necessary fields and validation
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username for each user
    fullName: { type: String, required: true }, // Full name of the user
    password: { type: String, required: true }, // Password for user authentication
    address: { type: String, required: true }, // Address of the user
    state: { type: String, required: true }, // State where the user resides
    nationality: { type: String, required: true }, // Nationality of the user
    localGovernment: { type: String, required: true }, // Local government area of the user
    phoneNumber: { type: String, required: true, unique: true }, // Unique phone number for the user
    NiN: { type: String, required: true, unique: true }, // National Identification Number (unique)
    dateOfBirth: { type: Date, required: true }, // Date of birth of the user
    isAdmin: { type: Boolean, default: false } // Boolean flag to check if the user is an admin
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    // Proceed only if the password is modified
    if (!this.isModified('password')) {
        return next();
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare a given password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create a User model using the defined schema
const User = mongoose.model('User', userSchema);

export default User;
