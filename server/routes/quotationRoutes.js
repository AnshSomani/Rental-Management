import express from 'express';
const router = express.Router();
import {
    addQuotationItems,
    getMyQuotations,
    getLenderQuotations,
    updateQuotationStatus
} from '../controllers/quotationController.js';
import { protect, lender } from '../middleware/authMiddleware.js';

// @route   /api/quotations

// POST a new quotation (Private, Customer)
router.route('/').post(protect, addQuotationItems);

// GET all quotations for the logged-in customer (Private, Customer)
router.route('/myquotations').get(protect, getMyQuotations);

// GET all quotations for the logged-in lender (Private, Lender)
router.route('/lender').get(protect, lender, getLenderQuotations);

// PUT update quotation status (Private, Lender)
router.route('/:id/status').put(protect, lender, updateQuotationStatus);

export default router;