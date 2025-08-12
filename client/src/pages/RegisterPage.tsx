import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import '../styles/Auth.css';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { api } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/register', { fullName, email, password });

      setLoading(false);
      navigate('/');

    } catch (err: any) {
      // Improved error handling to display validation messages
      if (err.response && err.response.data.errors) {
        const firstError = err.response.data.errors[0].msg;
        setError(firstError);
      } else {
        setError(err.response?.data?.message || 'An error occurred');
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-panel">
         <div>
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white mb-8">
            <ShoppingBag className="h-8 w-8 text-indigo-500" />
            <span>Rentify</span>
          </Link>
          <h1 className="auth-panel-title">Join the Community</h1>
          <p className="auth-panel-subtitle">
            Create an account to start renting and lending today. It's fast, easy, and free to join.
          </p>
        </div>
      </div>
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">Create a New Account</h2>
          {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}

          <div className="input-group">
            <label htmlFor="fullName" className="input-label">Full Name</label>
            <input type="text" id="fullName" className="auth-input" placeholder="John Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <input type="email" id="email" className="auth-input" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" id="password" className="auth-input" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input type="password" id="confirmPassword" className="auth-input" placeholder="••••••••" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
