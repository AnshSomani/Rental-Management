import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useApp } from '../../context/AppContext'; // This will be used later

const ContactUsPage = () => {
    // const { addContactSubmission, error } = useApp(); // This will be replaced by context
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        // In a real app, an API call would be made here
        console.log({ name, email, message });
        alert('Thank you for your message! We will get back to you shortly.');
        navigate('/');
    };

    return (
        <div className="p-8 max-w-2xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-gray-400 text-center mb-8">
                Have a question or feedback? Fill out the form below and we'll get back to you.
            </p>
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-sm mb-1 font-medium">Full Name</label>
                        <input 
                            name="name" 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-1 font-medium">Email Address</label>
                        <input 
                            name="email" 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-1 font-medium">Message</label>
                        <textarea 
                            name="message" 
                            rows="5" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required 
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-500 font-semibold transition-colors"
                    >
                        Submit Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUsPage;
