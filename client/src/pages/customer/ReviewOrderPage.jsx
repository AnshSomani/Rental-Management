import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2Icon } from '../../assets/icons.jsx';
import QuantityInput from '../../components/QuantityInput.jsx';
// import { useApp } from '../../context/AppContext'; // This will be used later

const ReviewOrderPage = () => {
    // const { user, cart, updateCartQuantity, removeFromCart, requestQuotation } = useApp(); // To be used later
    const navigate = useNavigate();
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');

    // Placeholder data until context is fully wired
    const cart = [
        { product: { id: '1', name: 'Professional DSLR Camera', priceList: { day: 150 }, imageUrl: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600', pickupAddress: '123 Tech Lane, Silicon Valley, CA' }, quantity: 1 },
    ];
    
    if (cart.length === 0) {
        return (
            <div className="p-8 text-center text-white">
                <h1 className="text-2xl">Your cart is empty.</h1>
                <Link to="/" className="text-indigo-400 hover:underline mt-4 inline-block">Start renting!</Link>
            </div>
        );
    }

    const subtotal = cart.reduce((sum, item) => sum + item.product.priceList.day * item.quantity, 0);
    const taxes = subtotal * 0.05; // Assuming 5% tax
    const deliveryCharge = deliveryMethod === 'delivery' ? 50 : 0;
    const total = subtotal + taxes + deliveryCharge;

    const handleRequestQuotation = (e) => {
        e.preventDefault();
        // API call logic will go here
        alert('Quotation requested!');
        navigate('/my-orders');
    };

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Request Quotation</h1>
            <form onSubmit={handleRequestQuotation} className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-8">
                    {/* Step 1: Review Items */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">1. Review Items</h2>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.product.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.product.name}</h3>
                                        <p className="text-indigo-400 font-bold">₹{item.product.priceList.day}/day</p>
                                    </div>
                                    <QuantityInput 
                                        quantity={item.quantity} 
                                        onDecrease={() => alert('Decrease quantity')} 
                                        onIncrease={() => alert('Increase quantity')} 
                                    />
                                    <button type="button" onClick={() => alert('Remove from cart')} className="p-2 text-gray-400 hover:text-red-500"><Trash2Icon /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Rental Period */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">2. Select Rental Period</h2>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">From:</label>
                                <input name="rentalFrom" type="date" required className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">To:</label>
                                <input name="rentalTo" type="date" required className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Delivery & Addresses */}
                     <div>
                        <h2 className="text-2xl font-bold mb-4">3. Delivery Method & Addresses</h2>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="delivery" value="pickup" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="form-radio bg-gray-900 border-gray-600"/>Self Pickup</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="delivery" value="delivery" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} className="form-radio bg-gray-900 border-gray-600"/>Home Delivery (+₹{deliveryCharge})</label>
                            </div>
                            
                            {deliveryMethod === 'delivery' ? (
                                <>
                                    <div><label className="block text-sm mb-1">Delivery Address</label><textarea name="deliveryAddress" rows="3" required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea></div>
                                    <div><label className="block text-sm mb-1">Invoice Address</label><textarea name="invoiceAddress" rows="3" required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea></div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-gray-900 p-4 rounded-md"><p className="text-sm font-semibold">Pickup Address:</p><p className="text-gray-300">{cart[0].product.pickupAddress}</p></div>
                                    <div><label className="block text-sm mb-1">Invoice Address</label><textarea name="invoiceAddress" rows="3" required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea></div>
                                </>
                            )}
                        </div>
                     </div>
                </div>

                {/* Summary Section */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full lg:w-1/3 h-fit">
                    <h3 className="text-xl font-semibold mb-4">Summary</h3>
                    <div className="space-y-2 text-gray-300">
                        <div className="flex justify-between"><span>Sub Total</span><span>₹{subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Taxes</span><span>₹{taxes.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Delivery Charge</span><span>₹{deliveryCharge.toFixed(2)}</span></div>
                        <div className="border-t border-gray-600 my-2"></div>
                        <div className="flex justify-between text-white font-bold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                    </div>
                    <button type="submit" className="w-full mt-6 bg-green-600 py-3 rounded-lg hover:bg-green-500 font-semibold transition-colors">
                        Confirm & Request Quotation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewOrderPage;
