// server/routes/paymentRoutes.js
const express = require('express');
const { createRazorpayOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a Razorpay order
router.post('/create-order', protect, createRazorpayOrder);

// Route to verify the payment signature
router.post('/verify', protect, verifyPayment);

module.exports = router;