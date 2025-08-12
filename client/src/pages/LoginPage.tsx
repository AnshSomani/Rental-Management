import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, User, Briefcase } from 'lucide-react';
import '../styles/Auth.css';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'lender'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // API call to the backend login endpoint
      const { data } = await axios.post(
        'http://localhost:5001/api/auth/login',
        { email, password, role }, // We send email, password, and the selected role
        config
      );

      console.log('Login successful:', data);
      // TODO: Save user data/token to context or local storage
      
      setLoading(false);

      // Redirect based on the user's role
      if (data.role === 'lender') {
        navigate('/lender/dashboard');
      } else {
        navigate('/');
      }

    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
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
          <h1 className="auth-panel-title">Welcome Back!</h1>
          <p className="auth-panel-subtitle">
            Rent the gear you need, or lend out your own. Your community marketplace awaits.
          </p>
        </div>
      </div>
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">Login to Your Account</h2>
          {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}

          <div className="role-selector">
            <div
              className={`role-option ${role === 'customer' ? 'selected' : ''}`}
              onClick={() => setRole('customer')}
            >
              <User />
              <span>Customer</span>
            </div>
            <div
              className={`role-option ${role === 'lender' ? 'selected' : ''}`}
              onClick={() => setRole('lender')}
            >
              <Briefcase />
              <span>Lender</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <input type="email" id="email" className="auth-input" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" id="password" className="auth-input" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${role === 'customer' ? 'Customer' : 'Lender'}`}
          </button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
