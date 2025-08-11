import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid, FiList } from 'react-icons/fi';
import RazorpayButton from '../components/RazorpayButton';

const OrderCard = ({ order, onSchedule }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col text-left shadow-md">
    <h3 className="font-bold text-gray-800 text-md mb-1">{order.product?.name || 'N/A'}</h3>
    <p className="text-gray-500">Order ID: {order._id}</p>
    <p className="text-gray-500">Status: {order.orderStatus}</p>
    <p className="text-gray-700 font-semibold mt-1">Total: ₹{order.totalPrice} {order.amountDue > 0 ? `(Due: ₹${order.amountDue})` : ''}</p>
    {order.amountDue > 0 && (
      <div className="mt-2">
        <RazorpayButton amount={order.amountDue} orderId={order._id} />
      </div>
    )}
    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
      <input type="datetime-local" className="bg-gray-100 border border-gray-300 rounded-lg p-2" placeholder="Pickup schedule" onChange={(e) => onSchedule(order._id, { pickupScheduledAt: e.target.value })} />
      <input type="datetime-local" className="bg-gray-100 border border-gray-300 rounded-lg p-2" placeholder="Return schedule" onChange={(e) => onSchedule(order._id, { returnScheduledAt: e.target.value })} />
      <button className="bg-indigo-600 text-white rounded-lg px-3" onClick={() => onSchedule(order._id, { status: 'pickup' })}>Schedule</button>
    </div>
  </div>
);

const OrderRow = ({ order, onSchedule }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-6 shadow-md w-full">
    <div className="flex-grow">
      <h3 className="font-bold text-gray-800 text-lg">{order.product?.name || 'N/A'}</h3>
      <p className="text-gray-500">Order ID: {order._id}</p>
      <p className="text-gray-500">Status: {order.orderStatus}</p>
      <p className="text-gray-700 font-semibold">Total: ₹{order.totalPrice} {order.amountDue > 0 ? `(Due: ₹${order.amountDue})` : ''}</p>
      {order.amountDue > 0 && <div className="mt-2"><RazorpayButton amount={order.amountDue} orderId={order._id} /></div>}
    </div>
    <div className="flex-shrink-0 grid gap-2">
      <input type="datetime-local" className="bg-gray-100 border border-gray-300 rounded-lg p-2" onChange={(e) => onSchedule(order._id, { pickupScheduledAt: e.target.value })} />
      <input type="datetime-local" className="bg-gray-100 border border-gray-300 rounded-lg p-2" onChange={(e) => onSchedule(order._id, { returnScheduledAt: e.target.value })} />
      <button className="bg-indigo-600 text-white rounded-lg px-3 py-2" onClick={() => onSchedule(order._id, { status: 'pickup' })}>Schedule</button>
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
      if (!token) { navigate('/login'); return; }
      try {
        const { data } = await api.get('/api/orders/myorders');
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

  const handleSchedule = async (orderId, payload) => {
    try {
      await api.put(`/api/orders/${orderId}`, payload);
      const { data } = await api.get('/api/orders/myorders');
      setOrders(data);
    } catch (e) {
      alert('Failed to update schedule');
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-800">Loading orders...</div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center text-gray-800">Error fetching orders.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-lg">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}><FiGrid className={viewMode === 'grid' ? 'text-purple-800' : 'text-gray-500'} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : ''}`}><FiList className={viewMode === 'list' ? 'text-purple-800' : 'text-gray-500'} /></button>
          </div>
        </div>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orders.map(order => <OrderCard key={order._id} order={order} onSchedule={handleSchedule} />)}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => <OrderRow key={order._id} order={order} onSchedule={handleSchedule} />)}
          </div>
        )}
        <div className="mt-8 text-sm"><Link to="/rental-shop" className="text-indigo-700">← Continue shopping</Link></div>
      </main>
    </div>
  );
}