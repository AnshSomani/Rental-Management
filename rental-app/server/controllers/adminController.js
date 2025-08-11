// server/controllers/adminController.js
const RentalOrder = require('../models/RentalOrder');
const Product = require('../models/Product');

const getAdminDashboardData = async (req, res) => {
  try {
    const [rentalsCount, revenueAgg, topProductsAgg, topCustomersAgg, topCategoriesAgg] = await Promise.all([
      RentalOrder.countDocuments({}),
      RentalOrder.aggregate([
        { $match: { paymentStatus: { $in: ['paid', 'partial'] } } },
        { $group: { _id: null, revenue: { $sum: '$totalPrice' } } },
      ]),
      RentalOrder.aggregate([
        { $group: { _id: '$product', ordered: { $sum: 1 }, revenue: { $sum: '$totalPrice' } } },
        { $sort: { ordered: -1 } },
        { $limit: 5 },
      ]),
      RentalOrder.aggregate([
        { $group: { _id: '$user', ordered: { $sum: 1 }, revenue: { $sum: '$totalPrice' } } },
        { $sort: { revenue: -1 } },
        { $limit: 5 },
      ]),
      RentalOrder.aggregate([
        { $lookup: { from: 'products', localField: 'product', foreignField: '_id', as: 'productDoc' } },
        { $unwind: '$productDoc' },
        { $group: { _id: '$productDoc.category', ordered: { $sum: 1 }, revenue: { $sum: '$totalPrice' } } },
        { $sort: { ordered: -1 } },
        { $limit: 5 },
      ]),
    ]);

    // Resolve product names
    const productIds = topProductsAgg.map(p => p._id);
    const productMap = (await Product.find({ _id: { $in: productIds } })).reduce((acc, p) => { acc[p._id] = p; return acc; }, {});

    const topProducts = topProductsAgg.map(p => ({ product: productMap[p._id]?.name || String(p._id), ordered: p.ordered, revenue: p.revenue }));

    const data = {
      quotations: await RentalOrder.countDocuments({ orderStatus: 'quotation' }),
      rentals: rentalsCount,
      revenue: revenueAgg[0]?.revenue || 0,
      topProductCategories: topCategoriesAgg.map(c => ({ category: c._id, ordered: c.ordered, revenue: c.revenue })),
      topProducts,
      topCustomers: topCustomersAgg.map(c => ({ customer: String(c._id), ordered: c.ordered, revenue: c.revenue })),
    };

    res.json(data);
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAdminDashboardData };