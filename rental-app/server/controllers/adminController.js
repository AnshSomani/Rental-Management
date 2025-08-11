// server/controllers/adminController.js
const RentalOrder = require('../models/RentalOrder');
const Product = require('../models/Product');

const getAdminDashboardData = async (req, res) => {
    try {
        // --- This is placeholder data ---
        // You would replace this with actual Mongoose queries
        const totalRentals = 250;
        const totalRevenue = 150000;
        const topProductCategories = [
            { category: 'Electronics', ordered: 50, revenue: '25000' },
            { category: 'Furniture', ordered: 30, revenue: '18000' },
            { category: 'Appliances', ordered: 20, revenue: '12000' },
        ];
        const topProducts = [
            { product: 'Vintage Camera', ordered: 15, revenue: '7500' },
            { product: 'Drone', ordered: 10, revenue: '15000' },
        ];
        const topCustomers = [
            { customer: 'John Doe', ordered: 5, revenue: '3500' },
            { customer: 'Jane Smith', ordered: 3, revenue: '2000' },
        ];
        
        const data = {
            quotations: '10',
            rentals: totalRentals,
            revenue: totalRevenue,
            topProductCategories: topProductCategories,
            topProducts: topProducts,
            topCustomers: topCustomers,
        };

        res.json(data);
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAdminDashboardData };