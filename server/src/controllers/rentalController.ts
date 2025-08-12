import { Request, Response } from 'express';
import Rental from '../models/Rental';

// GET /api/rentals/mine (as customer)
export const getMyRentals = async (req: Request, res: Response) => {
  const userId = (req as any).userId as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Not authorized' });

  const rentals = await Rental.find({ customer: userId })
    .populate('product', 'name imageUrl price')
    .sort({ createdAt: -1 });

  res.json(rentals.map((r) => ({
    id: r._id,
    product: r.product,
    startDate: r.startDate,
    endDate: r.endDate,
    totalPrice: r.totalPrice,
    status: r.status,
  })));
};

// GET /api/rentals/lender (as lender)
export const getLenderRentals = async (req: Request, res: Response) => {
  const userId = (req as any).userId as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Not authorized' });

  const rentals = await Rental.find({ lender: userId })
    .populate('product', 'name imageUrl price')
    .sort({ createdAt: -1 });

  res.json(rentals.map((r) => ({
    id: r._id,
    product: r.product,
    customer: r.customer,
    startDate: r.startDate,
    endDate: r.endDate,
    totalPrice: r.totalPrice,
    status: r.status,
  })));
};