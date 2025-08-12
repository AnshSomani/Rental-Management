import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    createProduct,
    getMyProducts
} from '../controllers/productController.js';
import { protect, lender } from '../middleware/authMiddleware.js';

// @route   /api/products

// GET all products (Public)
// POST a new product (Private, Lender only)
router.route('/').get(getProducts).post(protect, lender, createProduct);

// GET all products for the logged-in lender (Private, Lender only)
router.get('/myproducts', protect, lender, getMyProducts);

// GET a single product by its ID (Public)
router.route('/:id').get(getProductById);

export default router;