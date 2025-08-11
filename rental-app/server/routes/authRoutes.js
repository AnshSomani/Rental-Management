// server/routes/authRoutes.js
const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router; // <--- This line must be present and correct