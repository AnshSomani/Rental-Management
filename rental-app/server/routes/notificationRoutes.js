const express = require('express');
const router = express.Router();
const { getUpcomingReturns } = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/upcoming-returns', protect, admin, getUpcomingReturns);

module.exports = router;