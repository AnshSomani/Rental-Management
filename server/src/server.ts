import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// --- Database Connection ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rental-app');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB();


// --- Middlewares ---
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies


// --- API Routes ---
app.get('/api', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRoutes); // Use the authentication routes


// --- Error Handling Middlewares ---
// Not Found Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// General Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // In development, show the stack trace
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});


app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
