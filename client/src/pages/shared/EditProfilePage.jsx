import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useApp } from '../../context/AppContext'; // This will be used later

const EditProfilePage = () => {
    // const { user, updateUser, error } = useApp(); // This will be replaced by context
    const user = { name: 'Adam', email: 'adam@example.com', phone: '9876543210', role: 'customer' }; // Placeholder
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhone(user.phone || '');
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        // updateUser({ name, phone });
        setMessage('Profile details updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match.');
            return;
        }
        // updateUser({ currentPassword, newPassword });
        setMessage('Password updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
            {message && <div className="bg-green-500 text-white p-3 rounded-md mb-6 text-center">{message}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Edit Details Form */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <form onSubmit={handleDetailsSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium">Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium">Email</label>
                            <input type="email" value={user.email} disabled className="w-full p-2 bg-gray-900 rounded border border-gray-700 cursor-not-allowed" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm mb-1 font-medium">Phone Number</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500 font-semibold transition-colors">Update Details</button>
                    </form>
                </div>

                {/* Change Password Form */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                     <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                     <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium">Current Password</label>
                            <input name="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1 font-medium">New Password</label>
                            <input name="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm mb-1 font-medium">Confirm New Password</label>
                            <input name="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button type="submit" className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-500 font-semibold transition-colors">Change Password</button>
                     </form>
                </div>
            </div>
            <div className="text-center mt-8">
                <Link to={user.role === 'lender' ? '/dashboard' : '/'} className="text-indigo-400 hover:underline">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default EditProfilePage;
