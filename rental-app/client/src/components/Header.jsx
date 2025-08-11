// client/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // A real application would use state to check for login status
  const isLoggedIn = false;
  const isAdmin = false;

  return (
    <header>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#333', color: 'white' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>RentalApp</Link>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Products</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Dashboard</Link>
              {isAdmin && (
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Admin</Link>
              )}
              <button>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;