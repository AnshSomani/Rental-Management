import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const QuotationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchQuotationById, user } = useApp();

    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchQuotationById(id);
                setQuotation(data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handlePrint = () => {
        alert("To save as a PDF, please change the 'Destination' in the upcoming print dialog to 'Save as PDF'.");
        window.print();
    };

    if (loading) {
        return <div className="p-8 text-center text-white">Loading...</div>;
    }

    if (!quotation) {
        return <div className="p-8 text-center text-white">Quotation not found.</div>;
    }

    const subtotal = Math.max(0, ((quotation.total || 0) - (quotation.deliveryCharge || 0)) / 1.05);
    const taxes = subtotal * 0.05;

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700 text-white" id="printable-quotation">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Quotation</h1>
                        <p className="text-indigo-400">{quotation._id}</p>
                    </div>
                    <div className="text-right text-sm">
                        <p>Order Date: {new Date(quotation.createdAt).toLocaleDateString()}</p>
                        <p>Status: {quotation.status}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="font-semibold mb-2">Customer Details</h2>
                        <p>{quotation.customer?.name}</p>
                        <p>{quotation.customer?.email}</p>
                        <p>{quotation.customer?.phone}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Addresses</h2>
                        {quotation.deliveryMethod === 'delivery' ? (
                            <>
                                <p className="font-bold text-sm">Delivery:</p><p className="text-gray-300">{quotation.deliveryAddress || 'N/A'}</p>
                                <p className="font-bold text-sm mt-2">Invoice:</p><p className="text-gray-300">{quotation.invoiceAddress}</p>
                            </>
                        ) : (
                            <>
                                <p className="font-bold text-sm">Pickup Address:</p><p className="text-gray-300">{quotation.pickupAddress || 'N/A'}</p>
                                <p className="font-bold text-sm mt-2">Invoice:</p><p className="text-gray-300">{quotation.invoiceAddress}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="font-semibold mb-2">Rental Period</h2>
                    <p>{new Date(quotation.rentalPeriod?.from).toLocaleDateString()} to {new Date(quotation.rentalPeriod?.to).toLocaleDateString()}</p>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Product Summary</h2>
                    <table className="w-full text-left">
                        <thead className="bg-gray-900"><tr className="text-gray-300"><th className="p-2">Product</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
                        <tbody>
                            {(quotation.products || []).map(item => (
                                <tr key={item._id} className="border-b border-gray-700">
                                    <td className="p-2">{item.product?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price || item.product?.priceList?.day || 0}</td>
                                    <td>₹{(item.price || item.product?.priceList?.day || 0) * (item.quantity || 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full md:w-1/2 ml-auto mt-4 space-y-2 text-right">
                        <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Taxes:</span><span>₹{taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Delivery:</span><span>₹{(quotation.deliveryCharge || 0).toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-2"><span>Total:</span><span>₹{(quotation.total || 0).toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 space-x-4">
                <button onClick={handlePrint} className="bg-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-500">Download / Print</button>
                <button onClick={() => navigate(-1)} className="text-indigo-400 hover:underline">Back to List</button>
            </div>
        </div>
    );
};

export default QuotationDetailPage;
