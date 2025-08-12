import React, { useState, useMemo, useEffect } from 'react';
import { SearchIcon } from '../../assets/icons.jsx';
import useDebounce from '../../hooks/useDebounce.js';
import { useApp } from '../../context/AppContext';

const LenderDashboardPage = () => {
    const { lenderQuotations, fetchLenderQuotations } = useApp();
    const [filter, setFilter] = useState('30days');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        fetchLenderQuotations();
    }, []);

    const filteredQuotations = useMemo(() => {
        let data = (lenderQuotations || []).filter(q => q.status === 'Returned');
        
        if (filter === '30days') {
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            data = data.filter(q => new Date(q.createdAt) > thirtyDaysAgo);
        }

        if (debouncedSearchTerm) {
            data = data.filter(q => (q.customer?.name || '').toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        }
        return data;
    }, [lenderQuotations, filter, debouncedSearchTerm]);

    const dashboardData = useMemo(() => {
        const totalRevenue = filteredQuotations.reduce((acc, q) => acc + (q.total || 0), 0);
        const activeRentals = (lenderQuotations || []).filter(q => q.status === 'PickedUp').length;
        
        const topCategories = {};
        const topProducts = {};
        const topCustomers = {};

        filteredQuotations.forEach(q => {
            // Top Customers
            const customerName = q.customer?.name || 'Unknown';
            topCustomers[customerName] = topCustomers[customerName] || { ordered: 0, revenue: 0 };
            topCustomers[customerName].ordered += 1;
            topCustomers[customerName].revenue += (q.total || 0);

            (q.products || []).forEach(item => {
                const category = item.product?.category || 'Other';
                const productName = item.product?.name || 'Unknown';
                const unitPrice = item.price || item.product?.priceList?.day || 0;
                const lineRevenue = (item.quantity || 0) * unitPrice;

                // Top Categories
                topCategories[category] = topCategories[category] || { ordered: 0, revenue: 0 };
                topCategories[category].ordered += (item.quantity || 0);
                topCategories[category].revenue += lineRevenue;

                // Top Products
                topProducts[productName] = topProducts[productName] || { ordered: 0, revenue: 0 };
                topProducts[productName].ordered += (item.quantity || 0);
                topProducts[productName].revenue += lineRevenue;
            });
        });

        const formatAndSort = (data) => Object.entries(data).map(([key, value]) => ({ name: key, ...value })).sort((a, b) => b.revenue - a.revenue);

        return {
            totalRevenue,
            activeRentals,
            totalQuotations: (lenderQuotations || []).length,
            topCategories: formatAndSort(topCategories),
            topProducts: formatAndSort(topProducts),
            topCustomers: formatAndSort(topCustomers),
        }
    }, [filteredQuotations, lenderQuotations]);


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
