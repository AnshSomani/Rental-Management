import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      </Routes>
    </Router>
  );
};