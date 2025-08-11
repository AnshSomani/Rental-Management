// client/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const Stat = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: s }, { data: n }] = await Promise.all([
          api.get('/api/admin/dashboard-data'),
          api.get('/api/notifications/upcoming-returns'),
        ]);
        setStats(s);
        setNotifications(n.notifications || []);
      } catch (e) {
        console.error('Failed to load admin data', e);
      }
    };
    load();
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Quotations" value={stats.quotations} />
        <Stat label="Rentals" value={stats.rentals} />
        <Stat label="Revenue" value={`₹${stats.revenue}`} />
        <Stat label="Top Categories" value={stats.topProductCategories?.length || 0} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold mb-3">Top Products</h2>
          <ul className="space-y-2">
            {stats.topProducts.map((p, i) => (
              <li key={i} className="flex justify-between text-sm"><span>{p.product}</span><span>Orders: {p.ordered} • ₹{p.revenue}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold mb-3">Top Customers</h2>
          <ul className="space-y-2">
            {stats.topCustomers.map((c, i) => (
              <li key={i} className="flex justify-between text-sm"><span>{c.customer}</span><span>Orders: {c.ordered} • ₹{c.revenue}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="font-semibold mb-3">Upcoming Return Notifications</h2>
        {notifications.length === 0 ? <p className="text-sm text-gray-500">No notifications</p> : (
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <li key={i} className="text-sm"><span className="font-semibold">[{n.role}]</span> {n.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;