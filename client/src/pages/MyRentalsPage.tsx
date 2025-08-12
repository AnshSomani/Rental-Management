import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, History, Heart, User, LogOut, Search } from 'lucide-react';
import '../styles/Dashboard.css'; // Reusing the same layout CSS

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
  // Placeholder data for all rentals
  const allRentals = [
    { id: 1, name: 'Mountain Bike', startDate: 'Aug 11, 2025', endDate: 'Aug 12, 2025', total: 75.00, status: 'Active', imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Bike' },
    { id: 2, name: 'Pro Camera Lens', startDate: 'Aug 10, 2025', endDate: 'Aug 15, 2025', total: 45.00, status: 'Completed', imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Lens' },
    { id: 3, name: 'Camping Tent', startDate: 'Jul 20, 2025', endDate: 'Jul 22, 2025', total: 70.00, status: 'Completed', imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Tent' },
    { id: 4, name: 'Party Speaker', startDate: 'Jun 05, 2025', endDate: 'Jun 06, 2025', total: 40.00, status: 'Completed', imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Speaker' },
  ];

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
              {allRentals.map(rental => (
                <tr key={rental.id}>
                  <td style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <img src={rental.imageUrl} alt={rental.name} style={{width: '50px', height: '50px', borderRadius: '0.25rem'}}/>
                    <span>{rental.name}</span>
                  </td>
                  <td>{rental.startDate}</td>
                  <td>{rental.endDate}</td>
                  <td>${rental.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${rental.status === 'Active' ? 'status-active' : 'status-completed'}`}>
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
