import React from 'react';
import { Link } from 'react-router-dom'; 
import { ShoppingBag, User, LogIn, LogOut } from 'lucide-react';
import './Navbar.css'; 
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <Link to="/" className="navbar-logo">
          <ShoppingBag />
          <span>Rentify</span>
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/support">Support</Link>
        </div>
        <div className="navbar-actions">
          {user ? (
            <>
              <Link to={user.role === 'lender' ? '/lender/dashboard' : '/dashboard'} className="navbar-account-link">
                <User height={20} width={20} />
                <span>{user.fullName.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="navbar-login-button" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <LogOut height={20} width={20} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-login-button">
              <LogIn height={20} width={20} />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
