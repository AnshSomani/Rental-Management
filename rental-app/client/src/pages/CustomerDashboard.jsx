import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FiHome, 
    FiShoppingBag, 
    FiHeart, 
    FiUser, 
    FiPhone, 
    FiGrid, 
    FiList, 
    FiSearch, 
    FiChevronDown,
    FiLogOut,
    FiFilter
} from 'react-icons/fi';

const OrderCard = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <h3 className="font-bold text-gray-800 text-md mb-1">{order.product?.name || 'N/A'}</h3>
        <p className="text-gray-500 mb-3">Order ID: {order._id}</p>
        <p className="text-gray-500 mb-3">Price: ₹{order.totalPrice}</p>
        <p className="text-gray-500 mb-3">Status: {order.orderStatus}</p>
    </div>
);

const OrderRow = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-6 shadow-md hover:shadow-lg hover:border-purple-300 transition-all duration-300 w-full">
        <div className="flex-grow">
            <h3 className="font-bold text-gray-800 text-lg">{order.product?.name || 'N/A'}</h3>
            <p className="text-gray-500 mb-3">Order ID: {order._id}</p>
            <p className="text-gray-500 mb-3">Status: {order.orderStatus}</p>
        </div>
        <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-purple-800">₹{order.totalPrice}</p>
        </div>
    </div>
);


export default function CustomerDashboard() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const userInfo = localStorage.getItem('userInfo');
            const token = userInfo ? JSON.parse(userInfo).token : null;

            if (!token) {
                navigate('/login');
                return;
            }
            
            try {
                const { data } = await axios.get('/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-800">Loading orders...</div>;
    }

    if (isError) {
        return <div className="min-h-screen flex items-center justify-center text-gray-800">Error fetching orders.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex space-x-3 overflow-x-auto pb-2">
                    {['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'].map(cat => (
                        <button key={cat} className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition whitespace-nowrap">
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Product Attributes</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3">Colors</h3>
                                    <div className="space-y-2 text-gray-600">
                                        <p>Red</p><p>Blue</p><p>Green</p>
                                    </div>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                                     <div className="space-y-2 text-gray-600">
                                         <p>$0 - $50</p><p>$50 - $100</p><p>$100+</p>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </aside>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                            <div className="flex items-center space-x-4">
                                {/* The 'My Orders' button with the icon has been removed from here. */}
                                <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-lg">
                                     <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}>
                                         <FiGrid className={viewMode === 'grid' ? 'text-purple-800' : 'text-gray-500'} />
                                     </button>
                                     <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : ''}`}>
                                         <FiList className={viewMode === 'list' ? 'text-purple-800' : 'text-gray-500'} />
                                     </button>
                                 </div>
                             </div>
                         </div>
                        
                        {orders.length === 0 ? (
                            <p className="text-center text-gray-500">You have no orders yet.</p>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {orders.map(order => <OrderCard key={order._id} order={order} />)}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => <OrderRow key={order._id} order={order} />)}
                            </div>
                        )}
                     </div>
                 </div>
            </main>
        </div>
    );
}