import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext'; // Assuming this is the correct path

const AddProductPage = () => {
    // Use the addProduct function and error state from your AppContext
    const { addProduct, error } = useApp();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: 'Electronics',
        description: '',
        imageFile: null, // Changed from imageUrl to handle file uploads
        pickupAddress: '',
        price_day: '',
        price_week: '',
        price_month: '',
        terms: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageFile') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads along with other data
        const productFormData = new FormData();
        productFormData.append('name', formData.name);
        productFormData.append('category', formData.category);
        productFormData.append('description', formData.description);
        productFormData.append('image', formData.imageFile); // Use 'image' as the key for the file
        productFormData.append('pickupAddress', formData.pickupAddress);
        productFormData.append('terms', formData.terms);

        // Append prices, ensuring they are numbers
        productFormData.append('priceList[day]', parseFloat(formData.price_day) || 0);
        productFormData.append('priceList[week]', parseFloat(formData.price_week) || 0);
        productFormData.append('priceList[month]', parseFloat(formData.price_month) || 0);

        console.log("Submitting new product...");
        const success = await addProduct(productFormData);

        if (success) {
            alert('Product added successfully!');
            navigate('/lender/products'); // Navigate only on success
        } else {
            // Error is handled globally or via the 'error' state from context
            console.error("Failed to add product.");
        }
    };

    const categories = ['Electronics', 'Outdoor Gear', 'Sports Equipment', 'Tools'];

    return (
        <div className="p-8 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">Add a New Product</h1>
            {/* Display error message if the context provides one */}
            {error && <div className="bg-red-500 p-3 rounded-md mb-4 text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-6">
                <div>
                    <label className="block text-sm mb-1 font-medium">Product Name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Description</label>
                    <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea>
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Product Image</label>
                    {/* Changed to file input for image uploads */}
                    <input name="imageFile" type="file" onChange={handleChange} required className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Pickup/Return Address</label>
                    <textarea name="pickupAddress" rows="3" value={formData.pickupAddress} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea>
                </div>
                
                <fieldset className="border border-gray-700 p-4 rounded-lg">
                    <legend className="px-2 font-semibold">Price List</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className="block text-xs mb-1">Per Day (₹)</label><input name="price_day" type="number" value={formData.price_day} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" /></div>
                        <div><label className="block text-xs mb-1">Per Week (₹)</label><input name="price_week" type="number" value={formData.price_week} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" /></div>
                        <div><label className="block text-xs mb-1">Per Month (₹)</label><input name="price_month" type="number" value={formData.price_month} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" /></div>
                    </div>
                </fieldset>
                
                <div>
                    <label className="block text-sm mb-1 font-medium">Terms & Conditions</label>
                    <textarea name="terms" rows="3" value={formData.terms} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-500 font-semibold transition-colors">
                    List Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
