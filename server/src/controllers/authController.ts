import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

// Function to generate a JWT
const generateToken = (id: string) => {
  // We use a placeholder for the secret. In a real app, this MUST be in a .env file
  return jwt.sign({ id }, process.env.JWT_SECRET || 'a-very-secret-key', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400); // Bad Request
      throw new Error('User already exists');
    }

    const user = await User.create({
      fullName,
      email,
      password,
    }) as typeof User.prototype;

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body; // Role is sent from the frontend

  try {
    // We need to explicitly select the password field as it's excluded by default
    const user = await User.findOne({ email }).select('+password') as typeof User.prototype | null;

    if (user && (await user.comparePassword(password))) {
      // Check if the user's role matches the role they are trying to log in as
      if (user.role !== role) {
        res.status(401); // Unauthorized
        throw new Error(`You are not registered as a ${role}`);
      }
      
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};
