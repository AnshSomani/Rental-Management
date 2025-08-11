const express = require('express');
const router = express.Router();
const { quotePrice } = require('../controllers/pricingController');

router.post('/quote', quotePrice);

module.exports = router;