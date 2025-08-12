import express from 'express';
const router = express.Router();
import { submitContactForm } from '../controllers/contactController.js';

// @desc    Submit a contact form inquiry
// @route   POST /api/contact
// @access  Public
router.route('/').post(submitContactForm);

export default router;
