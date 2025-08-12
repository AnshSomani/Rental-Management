import React from 'react';
import { Link } from 'react-router-dom';
// import { useApp } from '../../context/AppContext'; // This will be used later

const LenderOrdersPage = () => {
    // const { quotations } = useApp(); // This will be replaced by context
    
    // Placeholder data until context is fully wired
    const quotations = [
        { id: 'QUO-1', total: 157.50, status: 'Returned', orderDate: '2025-08-12', customer: { name: 'Adam' } },
        { id: 'QUO-2', total: 262.50, status: 'Returned', orderDate: '2025-07-15', customer: { name: 'Jane Doe' } },
    ];

    const completedOrders = quotations.filter(q => q.status === 'Returned');

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Completed Orders</h1>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-white">
                    <thead className="border-b border-gray-700 bg-gray-900/50">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-8 text-gray-400">
                                    No completed orders found.
                                </td>
                            </tr>
                        ) : (
                            completedOrders.map(order => (
                                <tr key={order.id} className="border-b border-gray-700 last:border-b-0">
                                    <td className="p-4 font-mono">{order.id}</td>
                                    <td>{order.customer.name}</td>
                                    <td>{order.orderDate}</td>
                                    <td>₹{order.total.toFixed(2)}</td>
                                    <td>
                                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Link to={`/quotation/${order.id}`} className="text-indigo-400 hover:underline font-semibold">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LenderOrdersPage;
