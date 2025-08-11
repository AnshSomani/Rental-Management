const express = require('express');
const router = express.Router(); 
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/ping', (req, res) => {
    console.log('Ping route hit!');
    res.status(200).json({ message: 'Pong!' });
});

router.post('/register', async (req, res) => {
    console.log('Register route received a request!'); 

    const { name, email, password } = req.body;
    console.log('Password received for registration:', password);

    if (!name || !email || !password) {
        console.log('Validation failed: Missing fields');
        return res.status(400).json({ message: 'Please enter all fields.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Registration failed: Email already in use');
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role: 'customer'
        });

        const user = await newUser.save();
        console.log('New user registered successfully:', user._id);

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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please register first.' });
        }
        
        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Password is not correct.' });
        }
        
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