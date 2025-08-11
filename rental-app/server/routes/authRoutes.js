const express = require('express');
const router = express.Router(); 
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Test route to check if the router is working
router.get('/ping', (req, res) => {
    console.log('Ping route hit!');
    res.status(200).json({ message: 'Pong!' });
});

// Registration route
router.post('/register', async (req, res) => {
    console.log('Register route received a request!'); 

    const { name, email, password } = req.body;
    console.log('Password received for registration:', password); // <--- ADDED LOG

    // Basic validation to ensure required fields exist
    if (!name || !email || !password) {
        console.log('Validation failed: Missing fields');
        return res.status(400).json({ message: 'Please enter all fields.' });
    }

    try {
        // 1. Check if a user already exists with this email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Registration failed: Email already in use');
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'customer' // Default role for new users
        });

        // 4. Save the user to the database
        const user = await newUser.save();
        console.log('New user registered successfully:', user._id);

        // 5. Create a JWT token for the new user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        
        res.status(201).json({
            message: 'Registration successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error('Server error during registration:', error);
        res.status(500).json({ message: 'Server error. Registration failed.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        // 1. Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please register first.' });
        }
        
        // 2. Use the method from the schema to compare passwords
        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Password is not correct.' });
        }
        
        // 3. If login is successful, create a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error('Server error during login:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;