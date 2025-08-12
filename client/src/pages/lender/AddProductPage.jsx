import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useApp } from '../../context/AppContext'; // This will be used later

const AddProductPage = () => {
    // const { addProduct, error } = useApp(); // This will be replaced by context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: 'Electronics',
        description: '',
        imageUrl: '',
        pickupAddress: '',
        price_hour: '',
        price_day: '',
        price_week: '',
        price_month: '',
        terms: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            imageUrl: formData.imageUrl,
            pickupAddress: formData.pickupAddress,
            priceList: {
                hour: formData.price_hour,
                day: formData.price_day,
                week: formData.price_week,
                month: formData.price_month,
            },
            terms: formData.terms,
        };
        console.log("Submitting new product:", productData);
        // const success = await addProduct(productData);
        // if (success) {
        //     navigate('/lender/products');
        // }
        alert('Product submitted! (Frontend only)');
        navigate('/lender/products');
    };

    const categories = ['Electronics', 'Outdoor Gear', 'Sports Equipment', 'Tools'];

    return (
        <div className="p-8 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">Add a New Product</h1>
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
                    <label className="block text-sm mb-1 font-medium">Image URL</label>
                    <input name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm mb-1 font-medium">Pickup/Return Address</label>
                    <textarea name="pickupAddress" rows="3" value={formData.pickupAddress} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600"></textarea>
                </div>
                
                <fieldset className="border border-gray-700 p-4 rounded-lg">
                    <legend className="px-2 font-semibold">Price List</legend>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><label className="block text-xs mb-1">Per Hour (₹)</label><input name="price_hour" type="number" value={formData.price_hour} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" /></div>
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
