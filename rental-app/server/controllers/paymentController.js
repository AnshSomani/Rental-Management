// server/controllers/paymentController.js
const crypto = require('crypto');
const { getRazorpayInstance } = require('../config/razorpay');
const RentalOrder = require('../models/RentalOrder');

// @desc    Create a new Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'order_rcptid_' + orderId, // Unique receipt ID
    };
    const razorpayOrder = await getRazorpayInstance().orders.create(options);
    res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify the payment signature and update the order
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, amount } = req.body;

  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    // Payment is valid, update the order in your database
    const order = await RentalOrder.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Treat 'amount' as INR major units; reduce amountDue
    const paid = Number(amount || order.amountDue || order.totalPrice);
    const remaining = Math.max(0, (order.amountDue || 0) - paid);

    order.amountDue = remaining;
    order.paymentId = razorpay_payment_id;
    order.paymentStatus = remaining === 0 ? 'paid' : 'partial';

    await order.save();
    return res.status(200).json({ message: 'Payment successful', order });
  } else {
    return res.status(400).json({ message: 'Invalid signature' });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };