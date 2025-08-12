import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from '../pages/ProductDetailPage'; 
import { CustomerDashboard } from '../pages/CustomerDashboard';
import { MyRentalsPage } from '../pages/MyRentalsPage';
import { AddProductPage } from '../pages/AddProductPage';
import { MyProductsPage } from '../pages/MyProductsPage';
// 👇 CHANGE THESE IMPORTS to use curly braces
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { LenderDashboard } from '../pages/LenderDashboard';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lender/dashboard" element={<LenderDashboard />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/my-rentals" element={<MyRentalsPage />} />
        <Route path="/lender/add-product" element={<AddProductPage />} />
        <Route path="/lender/products" element={<MyProductsPage />} />
      </Routes>
    </Router>
  );
};