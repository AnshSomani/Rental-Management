const mongoose = require('mongoose');

const pricelistRuleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  category: { type: String },
  customerGroup: { type: String },
  duration: { type: String, enum: ['hour', 'day', 'week', 'month', 'year'] },
  rate: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  fixedDiscount: { type: Number, default: 0 },
});

const pricelistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segment: { type: String }, // e.g., Corporate, VIP, Region
  validFrom: { type: Date },
  validTo: { type: Date },
  isActive: { type: Boolean, default: true },
  rules: [pricelistRuleSchema],
}, { timestamps: true });

module.exports = mongoose.model('Pricelist', pricelistSchema);