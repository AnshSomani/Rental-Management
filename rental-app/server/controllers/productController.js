// server/controllers/productController.js
const Product = require('../models/Product');
const RentalOrder = require('../models/RentalOrder');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, description, images, isRentable, pricing, stock, category } = req.body;
  try {
    const product = new Product({ name, description, images, isRentable, pricing, stock, category });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, description, images, isRentable, pricing, stock, category } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.images = images || product.images;
      product.isRentable = isRentable !== undefined ? isRentable : product.isRentable;
      product.pricing = pricing || product.pricing;
      product.stock = stock !== undefined ? stock : product.stock;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get availability for product in date range
// @route   GET /api/products/:id/availability?startDate&endDate
// @access  Public
const getProductAvailability = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) return res.status(400).json({ message: 'startDate and endDate are required' });
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const overlapping = await RentalOrder.aggregate([
      { $match: { product: product._id, orderStatus: { $in: ['reservation', 'pickup'] } } },
      { $match: { $expr: { $and: [ { $lt: ['$startDate', new Date(endDate)] }, { $gt: ['$endDate', new Date(startDate)] } ] } } },
      { $group: { _id: null, qty: { $sum: '$quantity' } } },
    ]);
    const reservedQty = overlapping.length ? overlapping[0].qty : 0;
    const available = Math.max(0, (product.stock || 0) - reservedQty);
    return res.json({ available, stock: product.stock, reservedQty });
  } catch (error) {
    console.error('Error computing availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductAvailability };