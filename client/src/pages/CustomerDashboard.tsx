import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, History, Heart, User, LogOut } from 'lucide-react';
import '../styles/Dashboard.css'; // We reuse the same layout CSS
import { useAuth } from '../context/AuthContext';

// --- Reusable Components (can be moved to separate files later) ---

const CustomerSidebar: React.FC = () => (
  <aside className="dashboard-sidebar">
    <Link to="/" className="sidebar-header">
      <ShoppingBag className="h-8 w-8 text-indigo-500" />
      <span>Rentify</span>
    </Link>
    <nav className="sidebar-nav">
      <Link to="/dashboard" className="sidebar-link active">
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/my-rentals" className="sidebar-link">
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

const ActiveRentalCard: React.FC<{ item: any }> = ({ item }) => (
    <div className="stat-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <img src={item.product?.imageUrl || 'https://placehold.co/100x100/1e293b/94a3b8?text=Img'} alt={item.product?.name} style={{ width: '80px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover' }} />
        <div>
            <p style={{ fontWeight: 600, color: 'white' }}>{item.product?.name}</p>
            <p className="stat-card-title">Return due: {new Date(item.endDate).toLocaleDateString()}</p>
            <a href="#" style={{ color: '#818cf8', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>View Details</a>
        </div>
    </div>
);

// --- Main CustomerDashboard Component ---

export const CustomerDashboard: React.FC = () => {
  const { user, api } = useAuth();
  const [activeRentals, setActiveRentals] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/rentals/mine');
      setActiveRentals(data.filter((r: any) => r.status === 'active'));
    };
    load();
  }, [api]);

  return (
    <div className="dashboard-layout">
      <CustomerSidebar />
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.fullName?.split(' ')[0] || 'Customer'}!</h1>
          <Link to="/" className="add-product-button" style={{textDecoration: 'none'}}>
            <span>Browse Products</span>
          </Link>
        </header>
        
        <div style={{marginBottom: '2rem'}}>
            <h3 className="activity-table-title" style={{fontSize: '1.5rem'}}>Your Active Rentals</h3>
            <div className="stats-grid">
                {activeRentals.map((item, index) => <ActiveRentalCard key={index} item={item} />)}
                {activeRentals.length === 0 && <p>No active rentals.</p>}
            </div>
        </div>
      </main>
    </div>
  );
};
