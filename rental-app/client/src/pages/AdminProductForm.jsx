import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSave, FiX, FiRefreshCcw, FiImage } from 'react-icons/fi';

const AdminProductForm = () => {
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
      // Get the token from local storage
      const userInfo = localStorage.getItem('userInfo');
      const token = userInfo ? JSON.parse(userInfo).token : null;

      if (!token) {
        setErrorMessage('You must be logged in to add a product.');
        setIsLoading(false);
        return;
      }
      
      // Prepare data for the API call, ensuring rates are numbers
      const dataToSend = {
          ...formData,
          stock: parseInt(formData.stock, 10),
          pricing: formData.pricing.map(p => ({
              ...p,
              rate: parseFloat(p.rate)
          }))
      };

      // Send data to the backend API endpoint for creating a product with the Authorization header
      const res = await axios.post('/api/products', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('Product added successfully!');
      setTimeout(() => navigate('/admin'), 2000); // Redirect to admin dashboard
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add product. Please check all fields.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#131622] to-[#1a1d2e] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto bg-[#191c2a]/90 backdrop-blur-xl border border-[#2d3748]/60 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Add New Product
        </h1>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 text-sm text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-[#23253c] border border-[#2d3748] rounded-xl py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full bg-[#23253c] border border-[#2d3748] rounded-xl py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full bg-[#23253c] border border-[#2d3748] rounded-xl py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Images (URLs)</label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <div className="relative flex-1">
                  <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e)}
                    placeholder={`Image URL ${index + 1}`}
                    className="w-full bg-[#23253c] border border-[#2d3748] rounded-xl py-3 pl-11 pr-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                {formData.images.length > 1 && (
                  <button type="button" onClick={() => removeImageField(index)} className="p-3 text-red-500 hover:text-white transition-colors">
                    <FiX />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addImageField} className="flex items-center space-x-2 text-indigo-400 hover:text-white mt-2">
              <FiPlus />
              <span>Add another image</span>
            </button>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium mb-2">Pricing</label>
            {formData.pricing.map((price, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2 items-center">
                <select
                  name="duration"
                  value={price.duration}
                  onChange={(e) => handlePricingChange(index, e)}
                  className="bg-[#23253c] border border-[#2d3748] rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                  className="w-full bg-[#23253c] border border-[#2d3748] rounded-xl py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                {formData.pricing.length > 1 && (
                  <button type="button" onClick={() => removePricingField(index)} className="p-3 text-red-500 hover:text-white transition-colors">
                    <FiX />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addPricingField} className="flex items-center space-x-2 text-indigo-400 hover:text-white mt-2">
              <FiPlus />
              <span>Add another pricing option</span>
            </button>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-2">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full bg-[#23253c] border border-[#2d3748] rounded-xl py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-transform ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] shadow-lg'
            }`}
          >
            {isLoading ? 'Saving Product...' : <span className="flex items-center justify-center space-x-2"><FiSave /> <span>Save Product</span></span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
