import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchQuotationById } = useApp();

    const [quotation, setQuotation] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    useEffect(() => {
        const load = async () => {
            const data = await fetchQuotationById(id);
            setQuotation(data);
        };
        load();
    }, [id]);

    if (!quotation) {
        return <div className="p-8 text-white">Loading...</div>;
    }

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Payment</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                    <div className="space-y-3">
                        <label className={`flex items-center gap-3 p-3 rounded border ${paymentMethod === 'credit_card' ? 'border-indigo-500' : 'border-gray-600'}`}>
                            <input type="radio" name="payment" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} />
                            Credit Card
                        </label>
                        <label className={`flex items-center gap-3 p-3 rounded border ${paymentMethod === 'upi' ? 'border-indigo-500' : 'border-gray-600'}`}>
                            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                            UPI
                        </label>
                        <label className={`flex items-center gap-3 p-3 rounded border ${paymentMethod === 'cod' ? 'border-indigo-500' : 'border-gray-600'}`}>
                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                            Cash on Delivery
                        </label>
                        {paymentMethod === 'credit_card' && (
                            <div className="p-4 bg-gray-900/50 rounded-lg ml-8 space-y-3">
                                <input placeholder="Name on Card" className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                                <input placeholder="Card Number" className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                                <div className="flex gap-3">
                                    <input placeholder="Expiration Date (MM/YY)" className="w-1/2 p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                                    <input placeholder="Security Code" className="w-1/2 p-2 bg-gray-700 rounded border border-gray-600 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-fit">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <div className="space-y-2 text-gray-300">
                        <div className="flex justify-between"><span>Quotation ID</span><span>{quotation._id}</span></div>
                        <div className="flex justify-between"><span>Total</span><span>₹{(quotation.total || 0).toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Delivery</span><span>₹{(quotation.deliveryCharge || 0).toFixed(2)}</span></div>
                    </div>
                    <button onClick={() => navigate('/my-orders')} className="mt-6 w-full bg-green-600 py-2 rounded hover:bg-green-500">Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
