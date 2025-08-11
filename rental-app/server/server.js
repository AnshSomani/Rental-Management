// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes'); // New admin routes
const paymentRoutes = require('./routes/paymentRoutes');
const pricingRoutes = require('./routes/pricingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes); // Mount the new admin routes
app.use('/api/payment', paymentRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/notifications', notificationRoutes);

// Connect to MongoDB and then start the server
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    const PORT = process.env.PORT || 5000;
    
    // Start the server ONLY ONCE after the database connection is successful
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
