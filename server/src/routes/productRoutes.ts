import express from 'express';
import { createProduct, getProductById, getProducts, getMyProducts } from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getProducts);
router.get('/mine', protect, getMyProducts);
router.get('/:id', getProductById);
router.post('/', protect, createProduct);

export default router;