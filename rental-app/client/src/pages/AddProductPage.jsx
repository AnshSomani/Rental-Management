import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiPlus,
  FiSave,
  FiX,
  FiImage,
  FiGrid,
  FiPackage,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
} from 'react-icons/fi';

// Sidebar Component (can be in the same file or imported)
const LenderSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };
  return (
    <aside className="bg-white text-gray-800 flex flex-col w-64 min-h-screen p-4 border-r border-gray-200">
      <div className="flex items-center gap-2 mb-8">
        <FiShoppingBag className="h-8 w-8 text-indigo-800" />
        <span className="text-xl font-bold text-gray-900">Rentify</span>
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 font-medium">
          <FiGrid size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin_product" className="flex items-center gap-3 px-3 py-2 rounded-md bg-purple-100 text-purple-800 font-semibold">
          <FiPackage size={20} />
          <span>My Products</span>
        </Link>
        <Link to="/lender/earnings" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 font-medium">
          <FiCreditCard size={20} />
          <span>Earnings</span>
        </Link>
      </nav>

      <div className="space-y-2 mt-6">
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 font-medium">
          <FiSettings size={20} />
          <span>Settings</span>
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 font-medium">
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// Main Page Component
const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [''],
        pricing: [{ duration: 'day', rate: '' }],
        stock: '',
        category: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePricingChange = (index, e) => {
        const newPricing = [...formData.pricing];
        newPricing[index] = { ...newPricing[index], [e.target.name]: e.target.value };
        setFormData({ ...formData, pricing: newPricing });
    };

    const handleImageChange = (index, e) => {
        const newImages = [...formData.images];
        newImages[index] = e.target.value;
        setFormData({ ...formData, images: newImages });
    };

    const addPricingField = () => {
        setFormData({
            ...formData,
            pricing: [...formData.pricing, { duration: 'day', rate: '' }],
        });
    };

    const removePricingField = (index) => {
        const newPricing = formData.pricing.filter((_, i) => i !== index);
        setFormData({ ...formData, pricing: newPricing });
    };

    const addImageField = () => {
        setFormData({
            ...formData,
            images: [...formData.images, ''],
        });
    };

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Get user info and token from local storage
            const userInfo = localStorage.getItem('userInfo');
            const token = userInfo ? JSON.parse(userInfo).token : null;

            // Check if the token exists. If not, the user isn't logged in.
            if (!token) {
                setErrorMessage('You are not logged in. Please log in to add a product.');
                setIsLoading(false);
                return;
            }
            
            const dataToSend = {
                ...formData,
                stock: parseInt(formData.stock, 10),
                pricing: formData.pricing.map(p => ({
                    ...p,
                    rate: parseFloat(p.rate)
                }))
            };
            
            // Create the configuration object with the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Send the data and the config object with the header to the backend
            await axios.post('/api/products', dataToSend, config);

            setSuccessMessage('Product added successfully!');
            setTimeout(() => navigate('/lender/products'), 2000);

        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to add product. Please try again.';
            setErrorMessage(msg);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            <LenderSidebar />
            <main className="flex-1 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add a New Product</h1>
                </header>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="productName"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Professional Camera Lens"
                                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your product in detail..."
                                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="sports">Sports</option>
                                    <option value="outdoors">Outdoors</option>
                                    <option value="tools">Tools</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
                                {formData.pricing.map((price, index) => (
                                    <div key={index} className="flex gap-2 items-center mb-2">
                                        <select
                                            name="duration"
                                            value={price.duration}
                                            onChange={(e) => handlePricingChange(index, e)}
                                            className="w-1/2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="hour">Per hour</option>
                                            <option value="day">Per day</option>
                                            <option value="week">Per week</option>
                                            <option value="month">Per month</option>
                                            <option value="year">Per year</option>
                                        </select>
                                        <input
                                            type="number"
                                            name="rate"
                                            value={price.rate}
                                            onChange={(e) => handlePricingChange(index, e)}
                                            placeholder="Rate (e.g., 100)"
                                            required
                                            className="w-1/2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        {formData.pricing.length > 1 && (
                                            <button type="button" onClick={() => removePricingField(index)} className="text-red-500 hover:text-red-700">
                                                <FiX size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={addPricingField} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mt-2 text-sm font-semibold">
                                    <FiPlus size={16} />
                                    <span>Add another pricing option</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                            {formData.images.map((image, index) => (
                                <div key={index} className="flex gap-2 items-center mb-2">
                                    <div className="relative flex-1">
                                        <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="url"
                                            value={image}
                                            onChange={(e) => handleImageChange(index, e)}
                                            placeholder={`Image URL ${index + 1}`}
                                            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    {formData.images.length > 1 && (
                                        <button type="button" onClick={() => removeImageField(index)} className="text-red-500 hover:text-red-700">
                                            <FiX size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addImageField} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mt-2 text-sm font-semibold">
                                <FiPlus size={16} />
                                <span>Add another image URL</span>
                            </button>

                            <div className="mt-6">
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10"
                                    min="0"
                                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="lg:col-span-2 flex justify-end mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Saving...' : (
                                <span className="flex items-center gap-2">
                                    <FiSave size={20} />
                                    <span>Add Product</span>
                                </span>
                            )}
                        </button>
                    </div>
                    
                    {/* Feedback Messages */}
                    {errorMessage && (
                        <div className="lg:col-span-2 mt-4 text-center text-red-600 p-3 bg-red-100 border border-red-300 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="lg:col-span-2 mt-4 text-center text-green-600 p-3 bg-green-100 border border-green-300 rounded-lg">
                            {successMessage}
                        </div>
                    )}
                </form>
            </main>
        </div>
    );
};

export default AddProductPage;