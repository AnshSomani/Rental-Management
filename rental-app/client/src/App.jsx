import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import RentalShop from './pages/RentalShop';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rental-shop" element={<RentalShop />} />
          
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;