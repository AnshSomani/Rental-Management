const express = require('express');
const router = express.Router();
const { quotePrice } = require('../controllers/pricingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/quote', protect, quotePrice);

module.exports = router;