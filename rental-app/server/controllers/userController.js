// server/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ user: { _id: user._id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  // ... (function logic)
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  // ... (function logic)
};

module.exports = { registerUser, authUser }; // <--- All functions must be exported here