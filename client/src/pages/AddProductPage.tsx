import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Package, Wallet, Settings, LogOut, UploadCloud } from 'lucide-react';
import '../styles/Dashboard.css';
import '../styles/AddProductPage.css';
import { useAuth } from '../context/AuthContext';

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
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const { api } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const name = nameRef.current?.value?.trim() || '';
        const description = descriptionRef.current?.value?.trim() || '';
        const category = categoryRef.current?.value || '';
        const price = Number(priceRef.current?.value || 0);
        
        await api.post('/products', { name, description, category, price, imageUrl });
        navigate('/lender/products');
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
                                    <input ref={nameRef} type="text" id="productName" className="form-input" placeholder="e.g., Professional Camera Lens" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea ref={descriptionRef} id="description" className="form-textarea" placeholder="Describe your product in detail..." required></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select ref={categoryRef} id="category" className="form-select" required>
                                        <option value="">Select a category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Outdoors">Outdoors</option>
                                        <option value="Tools">Tools</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="form-label">Price per Day ($)</label>
                                    <input ref={priceRef} type="number" id="price" className="form-input" placeholder="e.g., 45.00" required min="0" step="0.01" />
                                </div>
                            </div>

                            {/* Right Column: Image Upload */}
                            <div>
                                <div className="form-group">
                                    <label className="form-label">Product Image</label>
                                    <div className="image-upload-zone">
                                        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="form-input" />
                                        <div style={{marginTop: '0.5rem'}}>
                                            <UploadCloud size={24} />
                                            <p className="image-upload-hint">Paste an image URL for now</p>
                                        </div>
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
