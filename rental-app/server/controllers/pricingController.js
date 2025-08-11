// server/controllers/pricingController.js
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
  const dayEntry = pricing.find(p => p.duration === 'day');
  if (dayEntry) return { unit: 'day', qty: Math.max(1, Math.ceil(days)), rate: dayEntry.rate };
  throw new Error('No pricing configured for this product');
}

const quotePrice = async (req, res) => {
  const { productId, startDate, endDate, quantity = 1, paymentType = 'full' } = req.body;
  if (!productId || !startDate || !endDate) return res.status(400).json({ message: 'productId, startDate, endDate are required' });
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const chosen = choosePricingUnitAndRate(product.pricing || [], startDate, endDate);
    const baseTotal = chosen.qty * chosen.rate * quantity;
    let amountDue = baseTotal;
    if (paymentType === 'deposit') {
      const depositPercent = Number(process.env.DEPOSIT_PERCENT || 30);
      amountDue = Math.round((baseTotal * depositPercent) / 100);
    }
    res.json({ unit: chosen.unit, units: chosen.qty, rate: chosen.rate, quantity, total: baseTotal, amountDue });
  } catch (error) {
    console.error('Error generating quote:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { quotePrice };