const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'RentalOrder', required: true },
  type: { type: String, enum: ['full', 'deposit', 'late_fee', 'balance'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['draft', 'issued', 'paid', 'void'], default: 'issued' },
  dueDate: { type: Date },
  paidAt: { type: Date },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);