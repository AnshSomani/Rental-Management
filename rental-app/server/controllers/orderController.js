// server/controllers/orderController.js
const RentalOrder = require('../models/RentalOrder');

const createOrder = async (req, res) => {
    const { productId, startDate, endDate, totalPrice } = req.body;
    try {
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
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await RentalOrder.find({ user: userId }).populate('product');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await RentalOrder.findById(req.params.id);
        if (order) {
            order.orderStatus = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, getMyOrders, updateOrderStatus };
