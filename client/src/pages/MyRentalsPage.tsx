import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, History, Heart, User, LogOut, Search } from 'lucide-react';
import '../styles/Dashboard.css'; // Reusing the same layout CSS
import { useAuth } from '../context/AuthContext';

// --- Reusable Customer Sidebar Component ---
// In a real app, this would be a shared component
const CustomerSidebar: React.FC = () => (
  <aside className="dashboard-sidebar">
    <Link to="/" className="sidebar-header">
      <ShoppingBag className="h-8 w-8 text-indigo-500" />
      <span>Rentify</span>
    </Link>
    <nav className="sidebar-nav">
      <Link to="/dashboard" className="sidebar-link">
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/my-rentals" className="sidebar-link active">
        <History />
        <span>My Rentals</span>
      </Link>
      <Link to="/wishlist" className="sidebar-link">
        <Heart />
        <span>Wishlist</span>
      </Link>
    </nav>
    <div className="sidebar-footer">
      <Link to="/profile" className="sidebar-link">
        <User />
        <span>Profile Settings</span>
      </Link>
      <Link to="/logout" className="sidebar-link">
        <LogOut />
        <span>Logout</span>
      </Link>
    </div>
  </aside>
);

// --- Main MyRentalsPage Component ---
export const MyRentalsPage: React.FC = () => {
  const { api } = useAuth();
  const [rentals, setRentals] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/rentals/mine');
      setRentals(data);
    };
    load();
  }, [api]);

  const fmt = (date: string) => new Date(date).toLocaleDateString();

  return (
    <div className="dashboard-layout">
      <CustomerSidebar />
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">My Rentals</h1>
          <div className="relative">
            <input type="text" placeholder="Search rentals..." className="custom-input" style={{paddingLeft: '2.5rem'}}/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{position: 'absolute'}}/>
          </div>
        </header>

        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Paid</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.id}>
                  <td style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <img src={rental.product?.imageUrl || 'https://placehold.co/50x50/1e293b/94a3b8?text=Img'} alt={rental.product?.name} style={{width: '50px', height: '50px', borderRadius: '0.25rem'}}/>
                    <span>{rental.product?.name}</span>
                  </td>
                  <td>{fmt(rental.startDate)}</td>
                  <td>{fmt(rental.endDate)}</td>
                  <td>${Number(rental.totalPrice).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${rental.status === 'active' ? 'status-active' : 'status-completed'}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td>
                    <a href="#" style={{color: '#818cf8', fontWeight: 500}}>View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
