import Quotation from '../models/quotationModel.js';
import Product from '../models/productModel.js';

// @desc    Create new quotation
// @route   POST /api/quotations
// @access  Private
const addQuotationItems = async (req, res) => {
    try {
        const { items, totalPrice, tax, deliveryCharge, finalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No quotation items' });
        }

        // For this example, we'll assume all items in a single quotation
        // belong to the same lender. We find the lender from the first product.
        const firstProduct = await Product.findById(items[0].product);
        if (!firstProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const lender = firstProduct.user;

        const quotation = new Quotation({
            customer: req.user._id,
            lender,
            items,
            totalPrice,
            tax,
            deliveryCharge,
            finalAmount,
            // Set an expiry date for the quotation, e.g., 3 days from now
            expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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
            .populate('items.product', 'name imageUrl');
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
            .populate('items.product', 'name imageUrl');
        res.json(quotations);
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
            // Security check: Ensure the user updating the status is the lender for this quotation
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
    updateQuotationStatus
};