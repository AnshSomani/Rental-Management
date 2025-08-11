const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'RentalOrder', required: true },
  type: { type: String, enum: ['pickup', 'return'], required: true },
  scheduledAt: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'in_transit', 'completed', 'cancelled'], default: 'scheduled' },
  address: { type: String },
  contactName: { type: String },
  contactPhone: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);