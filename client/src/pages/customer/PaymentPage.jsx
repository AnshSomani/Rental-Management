import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useApp } from '../../context/AppContext'; // This will be used later

const PaymentPage = () => {
    // const { user, quotations, updateQuotationStatus } = useApp(); // This will be replaced by context
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Placeholder data until context is fully wired
    const quotations = [
        { id: 'QUO-12345', orderDate: '2025-08-12', total: 157.50, status: 'Quotation Sent', customer: { email: 'adam@example.com' } },
        { id: 'QUO-67890', orderDate: '2025-08-11', total: 262.50, status: 'Reserved', customer: { email: 'adam@example.com' } },
        { id: 'QUO-11223', orderDate: '2025-08-10', total: 84.00, status: 'Payment Request', customer: { email: 'adam@example.com' }, deliveryCharge: 0, cart: [{product: {name: 'Test'}, quantity: 1}] },
    ];
    const quotation = quotations.find(q => q.id === id);

    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    if (!quotation) {
        return <div className="p-8 text-center text-white">Order not found or not ready for payment.</div>;
    }

    const handlePayment = () => {
        alert("Payment successful!");
        // updateQuotationStatus(quotation.id, 'PickedUp');
        navigate('/my-orders');
    };

    const subtotal = (quotation.total - quotation.deliveryCharge) / (1 + 0.05); // Assuming TAX_RATE is 0.05
    const taxes = subtotal * 0.05;

    return (
         <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-white">Confirm Payment for {quotation.id}</h1>
             <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-white">Choose a payment method</h2>
                    <div className="space-y-4">
                        <div className="p-3 border border-gray-600 rounded-lg">
                            <label className="flex items-center gap-3 text-white">
                                <input type="radio" name="payment" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={e => setPaymentMethod(e.target.value)} className="form-radio bg-gray-900 border-gray-600"/>
                                Credit Card
                            </label>
                        </div>
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
                        <div className="p-3 border border-gray-600 rounded-lg">
                            <label className="flex items-center gap-3 text-white">
                                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={e => setPaymentMethod(e.target.value)} className="form-radio bg-gray-900 border-gray-600"/>
                                UPI / QR Code
                            </label>
                        </div>
                        <div className="p-3 border border-gray-600 rounded-lg">
                            <label className="flex items-center gap-3 text-white">
                                <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={e => setPaymentMethod(e.target.value)} className="form-radio bg-gray-900 border-gray-600"/>
                                Paypal
                            </label>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full lg:w-1/3 h-fit">
                    <h3 className="text-xl font-semibold mb-4 text-white">Order Summary</h3>
                    <div className="space-y-2 text-gray-300">
                        <div className="flex justify-between"><span>Sub Total</span><span>₹{subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Taxes</span><span>₹{taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Delivery</span><span>₹{quotation.deliveryCharge.toFixed(2)}</span></div>
                        <div className="border-t border-gray-600 my-2"></div>
                        <div className="flex justify-between text-white font-bold text-lg"><span>Total</span><span>₹{quotation.total.toFixed(2)}</span></div>
                    </div>
                     <button onClick={handlePayment} className="w-full mt-6 bg-indigo-600 py-3 rounded-lg hover:bg-indigo-500 font-semibold transition-colors">
                        Pay Now
                     </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
