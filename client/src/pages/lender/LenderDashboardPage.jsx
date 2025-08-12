import React, { useState, useMemo } from 'react';
import { SearchIcon } from '../../assets/icons.jsx';
import useDebounce from '../../hooks/useDebounce.js';
// import { useApp } from '../../context/AppContext'; // This will be used later

const LenderDashboardPage = () => {
    // const { quotations } = useApp(); // This will be replaced by context
    const [filter, setFilter] = useState('30days');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    
    // --- MOCK DATA UNTIL API IS CONNECTED ---
    const quotations = [
        { id: 'QUO-1', total: 157.50, status: 'Returned', orderDate: new Date().toISOString(), customer: { name: 'Adam' }, cart: [{ product: { name: 'DSLR Camera', category: 'Electronics' }, quantity: 1 }] },
        { id: 'QUO-2', total: 262.50, status: 'Returned', orderDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), customer: { name: 'Jane Doe' }, cart: [{ product: { name: 'Camping Tent', category: 'Outdoor Gear' }, quantity: 2 }] },
        { id: 'QUO-3', total: 84.00, status: 'PickedUp', orderDate: new Date().toISOString(), customer: { name: 'Adam' }, cart: [{ product: { name: 'E-Bike', category: 'Sports Equipment' }, quantity: 1 }] },
    ];
    // --- END MOCK DATA ---

    const filteredQuotations = useMemo(() => {
        let data = quotations.filter(q => q.status === 'Returned'); // Only consider completed orders for revenue
        
        if (filter === '30days') {
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            data = data.filter(q => new Date(q.orderDate) > thirtyDaysAgo);
        }

        if (debouncedSearchTerm) {
            data = data.filter(q => q.customer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        }
        return data;
    }, [quotations, filter, debouncedSearchTerm]);

    const dashboardData = useMemo(() => {
        const totalRevenue = filteredQuotations.reduce((acc, q) => acc + q.total, 0);
        const activeRentals = quotations.filter(q => q.status === 'PickedUp').length;
        
        const topCategories = {};
        const topProducts = {};
        const topCustomers = {};

        filteredQuotations.forEach(q => {
            // Top Customers
            topCustomers[q.customer.name] = topCustomers[q.customer.name] || { ordered: 0, revenue: 0 };
            topCustomers[q.customer.name].ordered += 1;
            topCustomers[q.customer.name].revenue += q.total;

            q.cart.forEach(item => {
                // Top Categories
                topCategories[item.product.category] = topCategories[item.product.category] || { ordered: 0, revenue: 0 };
                topCategories[item.product.category].ordered += item.quantity;
                topCategories[item.product.category].revenue += item.quantity * item.product.price;

                // Top Products
                topProducts[item.product.name] = topProducts[item.product.name] || { ordered: 0, revenue: 0 };
                topProducts[item.product.name].ordered += item.quantity;
                topProducts[item.product.name].revenue += item.quantity * item.product.price;
            });
        });

        const formatAndSort = (data) => Object.entries(data).map(([key, value]) => ({ name: key, ...value })).sort((a, b) => b.revenue - a.revenue);

        return {
            totalRevenue,
            activeRentals,
            totalQuotations: quotations.length,
            topCategories: formatAndSort(topCategories),
            topProducts: formatAndSort(topProducts),
            topCustomers: formatAndSort(topCustomers),
        }
    }, [filteredQuotations, quotations]);


    return (
        <div className="p-8 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input 
                        type="text" 
                        placeholder="Search customers..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md pl-10 p-2 w-64" 
                    />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-md p-2">
                    <option value="30days">Last 30 Days</option>
                    <option value="all">All Time</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">Quotations</p>
                    <p className="text-3xl font-bold">{dashboardData.totalQuotations}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">Active Rentals</p>
                    <p className="text-3xl font-bold">{dashboardData.activeRentals}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-3xl font-bold">₹{dashboardData.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Top Product Categories</h3>
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-700"><th className="py-2">Category</th><th>Ordered</th><th>Revenue</th></tr></thead>
                        <tbody>{dashboardData.topCategories.map(c => <tr key={c.name} className="border-b border-gray-700 last:border-b-0"><td className="py-2">{c.name}</td><td>{c.ordered}</td><td>₹{c.revenue.toFixed(2)}</td></tr>)}</tbody>
                    </table>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Top Products</h3>
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-700"><th className="py-2">Product</th><th>Ordered</th><th>Revenue</th></tr></thead>
                        <tbody>{dashboardData.topProducts.map(p => <tr key={p.name} className="border-b border-gray-700 last:border-b-0"><td className="py-2">{p.name}</td><td>{p.ordered}</td><td>₹{p.revenue.toFixed(2)}</td></tr>)}</tbody>
                    </table>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Top Customers</h3>
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-700"><th className="py-2">Customer</th><th>Orders</th><th>Revenue</th></tr></thead>
                        <tbody>{dashboardData.topCustomers.map(c => <tr key={c.name} className="border-b border-gray-700 last:border-b-0"><td className="py-2">{c.name}</td><td>{c.ordered}</td><td>₹{c.revenue.toFixed(2)}</td></tr>)}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LenderDashboardPage;
