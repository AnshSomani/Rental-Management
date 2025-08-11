const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const protect = async (req, res, next) => {
    let token;
    
    // Check for authorization header and correct format
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Log the extracted token
            console.log('Extracted token:', token);

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Log the decoded payload to see user ID and role
            console.log('Token decoded:', decoded);

            // Get user from the token payload (decoded.id)
            req.user = await User.findById(decoded.id).select('-password');
            
            // Log the user found from the database
            console.log('User found and attached to request:', req.user._id);

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // If no token or malformed header, send an error immediately
        console.log('No token or malformed header found.');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
