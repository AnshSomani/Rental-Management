import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const LenderRentalsPage = () => {
    const { lenderQuotations, fetchLenderQuotations } = useApp();

    useEffect(() => {
        fetchLenderQuotations();
    }, []);

    const activeQuotations = (lenderQuotations || []).filter(q => q.status !== 'Returned');

    const StatusBadge = ({ status }) => {
        const colors = {
            'Pending': 'bg-yellow-900 text-yellow-300',
            'Quotation Sent': 'bg-blue-900 text-blue-300',
            'Reserved': 'bg-green-900 text-green-300',
            'Payment Request': 'bg-purple-900 text-purple-300',
            'PickedUp': 'bg-teal-900 text-teal-300',
        };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-700'}`}>{status}</span>;
    };

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Active Rentals & Quotations</h1>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700 bg-gray-900/50">
                        <tr>
                            <th className="p-4">Quotation ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeQuotations.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-8 text-gray-400">
                                    No active rentals or quotations.
                                </td>
                            </tr>
                        ) : (
                            activeQuotations.map(q => (
                                <tr key={q._id} className="border-b border-gray-700 last:border-b-0">
                                    <td className="p-4 font-mono">{q._id}</td>
                                    <td>{q.customer?.name || '-'}</td>
                                    <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                                    <td>₹{(q.total || 0).toFixed(2)}</td>
                                    <td><StatusBadge status={q.status} /></td>
                                    <td className="p-4">
                                        <Link to={`/quotation/${q._id}`} className="text-indigo-400 hover:underline font-semibold">
                                            View
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

export default LenderRentalsPage;
