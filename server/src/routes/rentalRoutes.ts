import express from 'express';
import { getLenderRentals, getMyRentals } from '../controllers/rentalController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/mine', protect, getMyRentals);
router.get('/lender', protect, getLenderRentals);

export default router;