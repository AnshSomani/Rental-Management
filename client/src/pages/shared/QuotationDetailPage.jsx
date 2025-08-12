import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useApp } from '../../context/AppContext'; // This will be used later

const QuotationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const { user, quotations, updateQuotationStatus } = useApp(); // This will be replaced by context

    // Placeholder data until context is fully wired
    const user = { name: 'Adam', email: 'adam@example.com', role: 'customer' };
    const quotations = [
        { 
            id: 'QUO-12345', 
            orderDate: '2025-08-12', 
            total: 157.50, 
            status: 'Pending', 
            customer: { name: 'Adam', email: 'adam@example.com', phone: '9876543210' },
            deliveryMethod: 'pickup',
            pickupAddress: '123 Tech Lane, Silicon Valley, CA',
            invoiceAddress: '456 Customer Rd, User City',
            rentalPeriod: { from: '2025-08-20', to: '2025-08-22' },
            cart: [{ product: { id: '1', name: 'DSLR Camera', price: 150 }, quantity: 1 }],
            deliveryCharge: 0,
        },
    ];
    const quotation = quotations.find(q => q.id === id || `QUO-${id}` === q.id); // Simple matching for demo

    const handlePrint = () => {
        alert("To save as a PDF, please change the 'Destination' in the upcoming print dialog to 'Save as PDF'.");
        window.print();
    };

    if (!quotation) {
        return <div className="p-8 text-center text-white">Quotation not found.</div>;
    }

    const subtotal = (quotation.total - quotation.deliveryCharge) / (1 + 0.05);
    const taxes = subtotal * 0.05;

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700 text-white" id="printable-quotation">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Quotation</h1>
                        <p className="text-indigo-400">{quotation.id}</p>
                    </div>
                    <div className="text-right text-sm">
                        <p>Order Date: {quotation.orderDate}</p>
                        <p>Expiry Date: {quotation.expiryDate || 'N/A'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="font-semibold mb-2">Customer Details</h2>
                        <p>{quotation.customer.name}</p>
                        <p>{quotation.customer.email}</p>
                        <p>{quotation.customer.phone}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Addresses</h2>
                        {quotation.deliveryMethod === 'delivery' ? (
                            <>
                                <p className="font-bold text-sm">Delivery:</p><p className="text-gray-300">{quotation.deliveryAddress}</p>
                                <p className="font-bold text-sm mt-2">Invoice:</p><p className="text-gray-300">{quotation.invoiceAddress}</p>
                            </>
                        ) : (
                            <>
                                <p className="font-bold text-sm">Pickup Address:</p><p className="text-gray-300">{quotation.pickupAddress}</p>
                                <p className="font-bold text-sm mt-2">Invoice:</p><p className="text-gray-300">{quotation.invoiceAddress}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="font-semibold mb-2">Rental Period</h2>
                    <p>{quotation.rentalPeriod.from} to {quotation.rentalPeriod.to}</p>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Product Summary</h2>
                    <table className="w-full text-left">
                        <thead className="bg-gray-900"><tr className="text-gray-300"><th className="p-2">Product</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
                        <tbody>
                            {quotation.cart.map(item => (
                                <tr key={item.product.id} className="border-b border-gray-700">
                                    <td className="p-2">{item.product.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.product.price}</td>
                                    <td>₹{item.product.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full md:w-1/2 ml-auto mt-4 space-y-2 text-right">
                        <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Taxes:</span><span>₹{taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Delivery:</span><span>₹{quotation.deliveryCharge.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-2"><span>Total:</span><span>₹{quotation.total.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 space-x-4">
                {/* Action Buttons will be dynamically rendered here based on user role and quotation status */}
                <button onClick={handlePrint} className="bg-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-500">Download / Print</button>
                <button onClick={() => navigate(-1)} className="text-indigo-400 hover:underline">Back to List</button>
            </div>
        </div>
    );
};

export default QuotationDetailPage;
