import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Package, Wallet, Settings, LogOut, PlusCircle, DollarSign, RefreshCw } from 'lucide-react';
import '../styles/Dashboard.css';

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

const DashboardStats: React.FC = () => (
  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">Total Earnings</span>
        <DollarSign className="text-green-500" />
      </div>
      <p className="stat-card-value">$1,250.75</p>
    </div>
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">Active Rentals</span>
        <RefreshCw className="text-blue-500" />
      </div>
      <p className="stat-card-value">8</p>
    </div>
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">Total Products</span>
        <Package className="text-indigo-500" />
      </div>
      <p className="stat-card-value">22</p>
    </div>
  </div>
);

const RecentActivity: React.FC = () => (
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
                <tr>
                    <td>Pro Camera Lens</td>
                    <td>Jane Doe</td>
                    <td>Aug 10 - Aug 15</td>
                    <td>$45.00</td>
                    <td><span className="status-badge status-completed">Completed</span></td>
                </tr>
                <tr>
                    <td>Mountain Bike</td>
                    <td>John Smith</td>
                    <td>Aug 11 - Aug 12</td>
                    <td>$75.00</td>
                    <td><span className="status-badge status-active">Active</span></td>
                </tr>
            </tbody>
        </table>
    </div>
);


// --- Main LenderDashboard Component ---

export const LenderDashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, Lender!</h1>
          <button className="add-product-button">
            <PlusCircle />
            <span>Add New Product</span>
          </button>
        </header>
        <DashboardStats />
        <RecentActivity />
      </main>
    </div>
  );
};
