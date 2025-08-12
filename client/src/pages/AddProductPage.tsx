import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Package, Wallet, Settings, LogOut, UploadCloud } from 'lucide-react';
import '../styles/Dashboard.css';
import '../styles/AddProductPage.css';

// --- Reusable Lender Sidebar Component ---
// This would typically be in its own file
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


// --- Main AddProductPage Component ---
export const AddProductPage: React.FC = () => {
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Adding new product...');
    };

    return (
        <div className="dashboard-layout">
            <LenderSidebar />
            <main className="dashboard-main-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">Add a New Product</h1>
                </header>

                <div className="activity-table-container">
                    <form onSubmit={handleSubmit}>
                        <div className="add-product-form-grid">
                            {/* Left Column: Details */}
                            <div>
                                <div className="form-group">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input type="text" id="productName" className="form-input" placeholder="e.g., Professional Camera Lens" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea id="description" className="form-textarea" placeholder="Describe your product in detail..." required></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select id="category" className="form-select" required>
                                        <option value="">Select a category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="sports">Sports</option>
                                        <option value="outdoors">Outdoors</option>
                                        <option value="tools">Tools</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="form-label">Price per Day ($)</label>
                                    <input type="number" id="price" className="form-input" placeholder="e.g., 45.00" required min="0" step="0.01" />
                                </div>
                            </div>

                            {/* Right Column: Image Upload */}
                            <div>
                                <div className="form-group">
                                    <label className="form-label">Product Image</label>
                                    <div className="image-upload-zone">
                                        <input type="file" id="imageUpload" className="hidden-file-input" accept="image/*" />
                                        <label htmlFor="imageUpload" style={{cursor: 'pointer'}}>
                                            <UploadCloud size={48} />
                                            <p className="image-upload-text">Click to upload or drag and drop</p>
                                            <p className="image-upload-hint">PNG, JPG, GIF up to 10MB</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{textAlign: 'right', marginTop: '1rem'}}>
                            <button type="submit" className="add-product-button">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
