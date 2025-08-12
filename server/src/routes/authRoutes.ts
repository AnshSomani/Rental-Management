import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { registerValidator, loginValidator } from '../middleware/authValidator';

const router = express.Router();

// Apply the validator middleware before the controller function
router.post('/register', registerValidator, registerUser);

// Apply the validator middleware before the controller function
router.post('/login', loginValidator, loginUser);

export default router;
