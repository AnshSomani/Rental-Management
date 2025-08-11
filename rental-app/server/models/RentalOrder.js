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
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  pickupScheduledAt: {
    type: Date,
  },
  returnScheduledAt: {
    type: Date,
  },
  actualReturnAt: {
    type: Date,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  amountDue: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial'],
    default: 'pending',
  },
  paymentId: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ['quotation', 'reservation', 'pickup', 'return', 'completed', 'cancelled'],
    default: 'reservation',
  },
  lateFee: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('RentalOrder', rentalOrderSchema);