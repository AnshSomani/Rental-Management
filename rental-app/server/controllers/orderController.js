// server/controllers/orderController.js
const RentalOrder = require('../models/RentalOrder');
const Product = require('../models/Product');

function computeDurationMs(startDate, endDate) {
  return new Date(endDate).getTime() - new Date(startDate).getTime();
}

function choosePricingUnitAndRate(pricing, startDate, endDate) {
  const ms = computeDurationMs(startDate, endDate);
  const hours = ms / (1000 * 60 * 60);
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;
  // Simple heuristic
  if (hours < 24 && pricing.find(p => p.duration === 'hour')) {
    return { unit: 'hour', qty: Math.ceil(hours), rate: pricing.find(p => p.duration === 'hour').rate };
  }
  if (days < 7 && pricing.find(p => p.duration === 'day')) {
    return { unit: 'day', qty: Math.ceil(days), rate: pricing.find(p => p.duration === 'day').rate };
  }
  if (weeks < 4 && pricing.find(p => p.duration === 'week')) {
    return { unit: 'week', qty: Math.ceil(weeks), rate: pricing.find(p => p.duration === 'week').rate };
  }
  if (months < 12 && pricing.find(p => p.duration === 'month')) {
    return { unit: 'month', qty: Math.ceil(months), rate: pricing.find(p => p.duration === 'month').rate };
  }
  const yearEntry = pricing.find(p => p.duration === 'year');
  if (yearEntry) return { unit: 'year', qty: Math.max(1, Math.ceil(years)), rate: yearEntry.rate };
  // fallback to day if nothing else
  const dayEntry = pricing.find(p => p.duration === 'day');
  if (dayEntry) return { unit: 'day', qty: Math.max(1, Math.ceil(days)), rate: dayEntry.rate };
  throw new Error('No pricing configured for this product');
}

async function getOverlappingReservedQuantity(productId, startDate, endDate) {
  const overlapping = await RentalOrder.aggregate([
    { $match: { product: new require('mongoose').Types.ObjectId(productId), orderStatus: { $in: ['reservation', 'pickup'] } } },
    { $match: { $expr: { $and: [ { $lt: ['$startDate', new Date(endDate)] }, { $gt: ['$endDate', new Date(startDate)] } ] } } },
    { $group: { _id: null, qty: { $sum: '$quantity' } } },
  ]);
  return overlapping.length ? overlapping[0].qty : 0;
}

const createOrder = async (req, res) => {
  const { productId, startDate, endDate, quantity = 1, paymentType = 'full' } = req.body;
  try {
    const userId = req.user._id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Availability check
    const reservedQty = await getOverlappingReservedQuantity(productId, startDate, endDate);
    const available = Math.max(0, (product.stock || 0) - reservedQty);
    if (available < quantity) {
      return res.status(400).json({ message: 'Insufficient availability for selected dates', available });
    }

    // Compute price
    const chosen = choosePricingUnitAndRate(product.pricing || [], startDate, endDate);
    const baseTotal = chosen.qty * chosen.rate * quantity;

    let totalPrice = baseTotal;
    let amountDue = baseTotal;
    if (paymentType === 'deposit') {
      const depositPercent = Number(process.env.DEPOSIT_PERCENT || 30);
      const depositAmount = Math.round((baseTotal * depositPercent) / 100);
      totalPrice = baseTotal;
      amountDue = depositAmount;
    }

    const order = new RentalOrder({
      user: userId,
      product: productId,
      quantity,
      startDate,
      endDate,
      totalPrice,
      amountDue,
      orderStatus: 'reservation',
    });

    const createdOrder = await order.save();
    res.status(201).json({ message: 'Order created', orderId: createdOrder._id, amountDue });
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
  const { status, pickupScheduledAt, returnScheduledAt, actualReturnAt } = req.body;
  try {
    const order = await RentalOrder.findById(req.params.id).populate('product');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (pickupScheduledAt) order.pickupScheduledAt = pickupScheduledAt;
    if (returnScheduledAt) order.returnScheduledAt = returnScheduledAt;

    if (status) order.orderStatus = status;

    if (actualReturnAt) {
      order.actualReturnAt = actualReturnAt;
      // Late fee calculation
      const planned = new Date(order.endDate).getTime();
      const actual = new Date(actualReturnAt).getTime();
      if (actual > planned) {
        const lateDays = Math.ceil((actual - planned) / (1000 * 60 * 60 * 24));
        const dayPricing = order.product.pricing.find(p => p.duration === 'day');
        const perDay = dayPricing ? dayPricing.rate : Math.ceil(order.totalPrice / Math.max(1, (new Date(order.endDate) - new Date(order.startDate)) / (1000*60*60*24)));
        order.lateFee = lateDays * perDay;
        order.amountDue += order.lateFee;
      }
      order.orderStatus = 'completed';
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getMyOrders, updateOrderStatus };
