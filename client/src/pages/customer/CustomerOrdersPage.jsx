import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const CustomerOrdersPage = () => {
    const { user, customerQuotations, fetchMyQuotations } = useApp();
    
    useEffect(() => {
        fetchMyQuotations();
    }, []);

    const StatusBadge = ({ status }) => {
        const statusMap = {
            'Pending': { text: 'Quotation Sent', style: 'bg-yellow-900 text-yellow-300' },
            'Quotation Sent': { text: 'Quotation Approved', style: 'bg-blue-900 text-blue-300' },
            'Reserved': { text: 'Reserved', style: 'bg-green-900 text-green-300' },
            'Payment Request': { text: 'Payment Request', style: 'bg-purple-900 text-purple-300' },
            'PickedUp': { text: 'Picked Up', style: 'bg-teal-900 text-teal-300' },
            'Returned': { text: 'Returned', style: 'bg-gray-700 text-gray-300' },
        };
        const display = statusMap[status] || { text: status, style: 'bg-gray-700' };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${display.style}`}>{display.text}</span>
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">My Orders & Quotations</h1>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-white">
                    <thead className="border-b border-gray-700 bg-gray-900/50">
                        <tr>
                            <th className="p-4">Quotation ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!customerQuotations || customerQuotations.length === 0) ? (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-gray-400">
                                    You have no orders or quotations yet.
                                </td>
                            </tr>
                        ) : (
                            customerQuotations.map(q => (
                                <tr key={q._id} className="border-b border-gray-700">
                                    <td className="p-4 font-mono">{q._id}</td>
                                    <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                                    <td>₹{(q.total || 0).toFixed(2)}</td>
                                    <td><StatusBadge status={q.status} /></td>
                                    <td className="p-4">
                                        <Link to={`/quotation/${q._id}`} className="text-indigo-400 hover:underline font-semibold">View</Link>
                                        {q.status === 'Payment Request' && (
                                            <Link to={`/payment/${q._id}`} className="ml-4 bg-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-500 transition-colors">
                                                Pay Now
                                            </Link>
                                        )}
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

export default CustomerOrdersPage;
