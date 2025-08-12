import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Establish connection to MongoDB
connectDB();

const app = express();

// --- Middleware Setup ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the routers for different parts of the API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/contact', contactRoutes);


// --- Server Initialization ---
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));