import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * @desc    Middleware to protect routes by verifying JWT token
 * It attaches the user object to the request if the token is valid.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer TOKEN_STRING")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach to request object
      // We exclude the password for security
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

/**
 * @desc    Middleware to check if the user has a 'lender' role
 */
const lender = (req, res, next) => {
  if (req.user && req.user.role === 'lender') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a lender');
  }
};

export { protect, lender };
