import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Layouts & Pages
import Header from './components/Header';
import LenderHeader from './components/LenderHeader';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ShopPage from './pages/customer/ShopPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import WishlistPage from './pages/customer/WishlistPage';
import ReviewOrderPage from './pages/customer/ReviewOrderPage';
import CustomerOrdersPage from './pages/customer/CustomerOrdersPage';
import PaymentPage from './pages/customer/PaymentPage';
import LenderDashboardPage from './pages/lender/LenderDashboardPage';
import LenderProductsPage from './pages/lender/LenderProductsPage';
import AddProductPage from './pages/lender/AddProductPage';
import LenderRentalsPage from './pages/lender/LenderRentalsPage';
import LenderOrdersPage from './pages/lender/LenderOrdersPage';
import EditProfilePage from './pages/shared/EditProfilePage';
import ContactUsPage from './pages/shared/ContactUsPage';
import QuotationDetailPage from './pages/shared/QuotationDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { useApp } from './context/AppContext';

// A layout component to conditionally render the correct header
const AppLayout = ({ children }) => {
    const { user } = useApp();
    return (
        <>
            {user?.role === 'lender' ? <LenderHeader /> : <Header />}
            <main>{children}</main>
        </>
    );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* Customer Private Routes */}
          <Route element={<PrivateRoute roles={['customer']} />}>
            <Route path="/cart" element={<ReviewOrderPage />} />
            <Route path="/my-orders" element={<CustomerOrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
          </Route>

          {/* Lender Private Routes */}
          <Route element={<PrivateRoute roles={['lender']} />}>
            <Route path="/dashboard" element={<LenderDashboardPage />} />
            <Route path="/lender/products" element={<LenderProductsPage />} />
            <Route path="/lender/products/new" element={<AddProductPage />} />
            <Route path="/lender/rentals" element={<LenderRentalsPage />} />
            <Route path="/lender/orders" element={<LenderOrdersPage />} />
          </Route>

          {/* Shared Private Routes (for both roles) */}
          <Route element={<PrivateRoute roles={['customer', 'lender']} />}>
            <Route path="/quotation/:id" element={<QuotationDetailPage />} />
            <Route path="/profile" element={<EditProfilePage />} />
          </Route>

          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
