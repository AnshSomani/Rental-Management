// server/routes/productRoutes.js
const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router(); // This line is crucial

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct) // <--- This is the line the error points to
  .delete(protect, admin, deleteProduct);

module.exports = router; // This line is also crucial