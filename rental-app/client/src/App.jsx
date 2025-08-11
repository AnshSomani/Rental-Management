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
import AdminProductForm from './pages/AdminProductForm';
import ContactUs from './pages/ContactUs';
import EndUserDashboard from './pages/EndUserDashboard';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Routes>
          {/* All Routes are now public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rental-shop" element={<CustomerDashboard />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<RentalShop />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin_product" element= {<AdminProductForm/>} />
          <Route path="/seller-dashboard" element={<EndUserDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
