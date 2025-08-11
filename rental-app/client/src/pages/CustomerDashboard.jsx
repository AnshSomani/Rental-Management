// client/src/pages/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // You would need to handle JWT token in the header
        const { data } = await axios.get('/api/orders/myorders', {
          headers: {
            Authorization: `Bearer YOUR_JWT_TOKEN`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading your orders...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no current rental orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Product: {order.product.name} | From: {new Date(order.startDate).toDateString()} to {new Date(order.endDate).toDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerDashboard;