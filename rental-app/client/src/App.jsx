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
import AddProductPage from './pages/AddProductPage';
import Rentals from './pages/Rentals'

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<RentalShop />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rental-shop" element={<RentalShop />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin" element={<EndUserDashboard />} />
          <Route path="/admin_product" element= {<AddProductPage />} />
          <Route path="/lender/products" element={<AddProductPage />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
