// server/models/RentalOrder.js
const mongoose = require('mongoose');

const rentalOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  paymentId: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ['reservation', 'pickup', 'return'],
    default: 'reservation',
  },
}, { timestamps: true });

module.exports = mongoose.model('RentalOrder', rentalOrderSchema);