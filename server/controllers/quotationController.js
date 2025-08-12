import Quotation from '../models/quotationModel.js';
import Product from '../models/productModel.js';

// @desc    Create new quotation
// @route   POST /api/quotations
// @access  Private
const addQuotationItems = async (req, res) => {
    try {
        const { products, totalPrice, tax, deliveryCharge, finalAmount, deliveryMethod, rentalPeriod, deliveryAddress, invoiceAddress, pickupAddress } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No quotation products' });
        }

        if (!rentalPeriod?.from || !rentalPeriod?.to) {
            return res.status(400).json({ message: 'Missing rental period' });
        }

        const firstProduct = await Product.findById(products[0].product);
        if (!firstProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const lender = firstProduct.lender;

        const computedSubtotal = products.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
        const computedTax = typeof tax === 'number' ? tax : Math.round(computedSubtotal * 0.05);
        const computedDelivery = typeof deliveryCharge === 'number' ? deliveryCharge : 0;
        const computedTotal = typeof finalAmount === 'number' ? finalAmount : computedSubtotal + computedTax + computedDelivery;

        const quotation = new Quotation({
            customer: req.user._id,
            lender,
            products,
            total: computedTotal,
            deliveryCharge: computedDelivery,
            deliveryMethod: deliveryMethod || 'pickup',
            rentalPeriod,
            deliveryAddress,
            invoiceAddress: invoiceAddress || '',
            pickupAddress: pickupAddress || firstProduct.pickupAddress || '',
            status: 'Pending',
        });

        const createdQuotation = await quotation.save();
        res.status(201).json(createdQuotation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get quotations for the logged-in customer
// @route   GET /api/quotations/myquotations
// @access  Private
const getMyQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find({ customer: req.user._id })
            .populate('lender', 'name')
            .populate('products.product', 'name imageUrl priceList category');
        res.json(quotations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get quotations received by the logged-in lender
// @route   GET /api/quotations/lender
// @access  Private/Lender
const getLenderQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find({ lender: req.user._id })
            .populate('customer', 'name email')
            .populate('products.product', 'name imageUrl priceList category');
        res.json(quotations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single quotation by id (customer or lender can access)
// @route   GET /api/quotations/:id
// @access  Private
const getQuotationById = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id)
            .populate('customer', 'name email phone')
            .populate('lender', 'name email')
            .populate('products.product', 'name imageUrl priceList category');

        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }

        const userId = req.user._id.toString();
        if (quotation.customer._id.toString() !== userId && quotation.lender._id.toString() !== userId) {
            return res.status(401).json({ message: 'Not authorized to view this quotation' });
        }

        res.json(quotation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update quotation status (e.g., to 'Approved' or 'Rejected')
// @route   PUT /api/quotations/:id/status
// @access  Private/Lender
const updateQuotationStatus = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);

        if (quotation) {
            if (quotation.lender.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to update this quotation' });
            }
            quotation.status = req.body.status || quotation.status;
            const updatedQuotation = await quotation.save();
            res.json(updatedQuotation);
        } else {
            res.status(404).json({ message: 'Quotation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Make sure all functions are exported
export {
    addQuotationItems,
    getMyQuotations,
    getLenderQuotations,
    getQuotationById,
    updateQuotationStatus
};