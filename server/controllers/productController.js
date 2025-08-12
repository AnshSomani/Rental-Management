import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('lender', 'name');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('lender', 'name email');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Lender
const createProduct = async (req, res) => {
    try {
        const { name, category, description, priceList, imageUrl, color, terms, pickupAddress } = req.body;

        const product = new Product({
            name,
            category,
            description,
            priceList,
            imageUrl,
            color,
            terms,
            pickupAddress,
            lender: req.user._id,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data' });
    }
};

// @desc    Get products listed by the logged-in lender
// @route   GET /api/products/myproducts
// @access  Private/Lender
const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ lender: req.user._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Make sure all functions are exported
export {
    getProducts,
    getProductById,
    createProduct,
    getMyProducts
};