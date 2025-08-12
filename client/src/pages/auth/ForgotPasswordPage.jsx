import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const SIMULATED_OTP = '123456'; // In a real app, this would be generated and sent by the backend

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would make an API call here to send the OTP
        console.log(`Requesting OTP for ${email}`);
        setError('');
        alert(`An OTP has been sent to your email. (Hint: for this demo, it's ${SIMULATED_OTP})`);
        setStep(2);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const otp = e.target.elements.otp.value;
        if (otp === SIMULATED_OTP) {
            setError('');
            setStep(3);
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        const newPassword = e.target.elements.newPassword.value;
        const confirmPassword = e.target.elements.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        
        // In a real app, you would make an API call here to reset the password
        console.log(`Resetting password for ${email}`);
        alert('Password has been reset successfully. Please log in with your new password.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
            <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-900/50 p-3 rounded-md">{error}</p>}
                
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <p className="text-gray-400 mb-4 text-sm">Enter your email address and we'll send you an OTP to reset your password.</p>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500">Send OTP</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleOtpSubmit}>
                        <p className="text-gray-400 mb-4 text-sm">Please enter the 6-digit OTP sent to {email}.</p>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm">OTP</label>
                            <input name="otp" type="text" maxLength="6" required className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500">Verify OTP</button>
                    </form>
                )}
                
                {step === 3 && (
                    <form onSubmit={handleResetSubmit}>
                        <p className="text-gray-400 mb-4 text-sm">Create a new password for your account.</p>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm">New Password</label>
                            <input name="newPassword" type="password" required className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm">Confirm New Password</label>
                            <input name="confirmPassword" type="password" required className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500">Reset Password</button>
                    </form>
                )}
                <div className="text-center mt-4">
                     <Link to="/login" className="text-sm text-indigo-400 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
