import React from 'react';
import { Link } from 'react-router-dom'; 
import { ShoppingBag, User, LogIn } from 'lucide-react';
import './Navbar.css'; 

export const Navbar: React.FC = () => {
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
          <Link to="/account" className="navbar-account-link">
            <User height={20} width={20} />
            <span>My Account</span>
          </Link>
          <Link to="/login" className="navbar-login-button">
            <LogIn height={20} width={20} />
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};
