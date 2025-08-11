const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductAvailability } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.get('/:id/availability', getProductAvailability);

module.exports = router;