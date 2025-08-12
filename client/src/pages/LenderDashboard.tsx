import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Package, Wallet, Settings, LogOut, PlusCircle, DollarSign, RefreshCw } from 'lucide-react';
import '../styles/Dashboard.css';
import { useAuth } from '../context/AuthContext';

// --- Reusable Components (can be moved to separate files later) ---

const DashboardSidebar: React.FC = () => (
  <aside className="dashboard-sidebar">
    <Link to="/" className="sidebar-header">
      <ShoppingBag className="h-8 w-8 text-indigo-500" />
      <span>Rentify</span>
    </Link>
    <nav className="sidebar-nav">
      <Link to="/lender/dashboard" className="sidebar-link active">
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/lender/products" className="sidebar-link">
        <Package />
        <span>My Products</span>
      </Link>
      <Link to="/lender/earnings" className="sidebar-link">
        <Wallet />
        <span>Earnings</span>
      </Link>
    </nav>
    <div className="sidebar-footer">
      <Link to="/settings" className="sidebar-link">
        <Settings />
        <span>Settings</span>
      </Link>
      <Link to="/logout" className="sidebar-link">
        <LogOut />
        <span>Logout</span>
      </Link>
    </div>
  </aside>
);

const DashboardStats: React.FC<{ totalEarnings: number; activeRentals: number; totalProducts: number }> = ({ totalEarnings, activeRentals, totalProducts }) => (
  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">Total Earnings</span>
        <DollarSign className="text-green-500" />
      </div>
      <p className="stat-card-value">${totalEarnings.toFixed(2)}</p>
    </div>
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">Active Rentals</span>
        <RefreshCw className="text-blue-500" />
      </div>
      <p className="stat-card-value">{activeRentals}</p>
    </div>
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">Total Products</span>
        <Package className="text-indigo-500" />
      </div>
      <p className="stat-card-value">{totalProducts}</p>
    </div>
  </div>
);

const RecentActivity: React.FC<{ items: any[] }> = ({ items }) => (
    <div className="activity-table-container">
        <h3 className="activity-table-title">Recent Rental Activity</h3>
        <table className="activity-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Dates</th>
                    <th>Earnings</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {items.map((r) => (
                  <tr key={r.id}>
                    <td>{r.product?.name}</td>
                    <td>{String(r.customer).slice(-6)}</td>
                    <td>{new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()}</td>
                    <td>${Number(r.totalPrice).toFixed(2)}</td>
                    <td><span className={`status-badge ${r.status === 'active' ? 'status-active' : 'status-completed'}`}>{r.status}</span></td>
                  </tr>
                ))}
            </tbody>
        </table>
    </div>
);


// --- Main LenderDashboard Component ---

export const LenderDashboard: React.FC = () => {
  const { user, api } = useAuth();
  const [lenderRentals, setLenderRentals] = useState<any[]>([]);
  const [myProductsCount, setMyProductsCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [{ data: rentals }, { data: products }] = await Promise.all([
        api.get('/rentals/lender'),
        api.get('/products/mine'),
      ]);
      setLenderRentals(rentals);
      setMyProductsCount(products.length);
    };
    load();
  }, [api]);

  const totalEarnings = useMemo(() => lenderRentals.reduce((sum, r) => sum + Number(r.totalPrice || 0), 0), [lenderRentals]);
  const activeCount = useMemo(() => lenderRentals.filter((r) => r.status === 'active').length, [lenderRentals]);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.fullName?.split(' ')[0] || 'Lender'}!</h1>
          <Link to="/lender/add-product" className="add-product-button" style={{textDecoration: 'none'}}>
            <PlusCircle />
            <span>Add New Product</span>
          </Link>
        </header>
        <DashboardStats totalEarnings={totalEarnings} activeRentals={activeCount} totalProducts={myProductsCount} />
        <RecentActivity items={lenderRentals.slice(0, 5)} />
      </main>
    </div>
  );
};
