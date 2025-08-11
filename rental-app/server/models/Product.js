const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  duration: { type: String, enum: ['hour', 'day', 'week', 'month', 'year'], required: true },
  rate: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  isRentable: { type: Boolean, default: true },
  pricing: [pricingSchema],
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);