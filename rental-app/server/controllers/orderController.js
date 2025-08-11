// server/controllers/orderController.js
const RentalOrder = require('../models/RentalOrder');

const createOrder = async (req, res) => {
  const { productId, startDate, endDate, totalPrice } = req.body;
  try {
    // You should get the user from the JWT token
    const userId = req.user._id;

    const order = new RentalOrder({
      user: userId,
      product: productId,
      startDate,
      endDate,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json({ message: 'Order created', orderId: createdOrder._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await RentalOrder.find({ user: userId }).populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// More controllers for admin views and order status updates...

module.exports = { createOrder, getMyOrders };