const express = require('express');
const router = express.Router(); 
const { createOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/:id')
    .put(protect, admin, updateOrderStatus);

module.exports = router;
