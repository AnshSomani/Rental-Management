import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// @route   /api/users

// POST register a new user (Public)
router.route('/').post(registerUser);

// POST authenticate user and get token (Public)
router.post('/login', authUser);

// GET user profile (Private)
// PUT update user profile (Private)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;