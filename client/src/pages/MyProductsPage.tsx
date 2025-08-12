import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Package, Wallet, Settings, LogOut, PlusCircle, Edit, Trash2 } from 'lucide-react';
import '../styles/Dashboard.css';
import '../styles/MyProductsPage.css';

// --- Reusable Lender Sidebar ---
const LenderSidebar: React.FC = () => (
  <aside className="dashboard-sidebar">
    <Link to="/" className="sidebar-header">
      <ShoppingBag className="h-8 w-8 text-indigo-500" />
      <span>Rentify</span>
    </Link>
    <nav className="sidebar-nav">
      <Link to="/lender/dashboard" className="sidebar-link">
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/lender/products" className="sidebar-link active">
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

// --- Main MyProductsPage Component ---
export const MyProductsPage: React.FC = () => {
  // Placeholder data for the lender's products
  const myProducts = [
    { id: 1, name: 'Pro Camera Lens', price: 45.00, status: 'Available', totalRentals: 12, imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Lens' },
    { id: 2, name: 'Mountain Bike', price: 75.00, status: 'Rented Out', totalRentals: 8, imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Bike' },
    { id: 3, name: 'Camping Tent', price: 35.00, status: 'Available', totalRentals: 25, imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Tent' },
    { id: 4, name: 'Electric Drill', price: 25.00, status: 'Available', totalRentals: 15, imageUrl: 'https://placehold.co/100x100/1e293b/94a3b8?text=Drill' },
  ];

  return (
    <div className="dashboard-layout">
      <LenderSidebar />
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">My Products</h1>
          <Link to="/lender/add-product" className="add-product-button" style={{textDecoration: 'none'}}>
            <PlusCircle />
            <span>Add New Product</span>
          </Link>
        </header>

        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price/Day</th>
                <th>Total Rentals</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map(product => (
                <tr key={product.id}>
                  <td style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <img src={product.imageUrl} alt={product.name} className="product-list-table-img"/>
                    <span className="product-list-item-name">{product.name}</span>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.totalRentals}</td>
                  <td>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked={product.status === 'Available'} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <div className="product-actions">
                        <button className="action-btn edit-btn"><Edit size={14}/> Edit</button>
                        <button className="action-btn delete-btn"><Trash2 size={14}/> Delete</button>
                    </div>
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
