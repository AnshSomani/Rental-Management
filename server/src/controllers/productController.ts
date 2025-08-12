import { Request, Response } from 'express';
import Product from '../models/Product';

// GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products.map((p) => ({
    id: p._id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    imageUrl: p.imageUrl || '',
    availability: p.availability,
    owner: p.owner,
  })));
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    imageUrl: product.imageUrl || '',
    availability: product.availability,
    owner: product.owner,
  });
};

// POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category, imageUrl } = req.body;
  const userId = (req as any).userId as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Not authorized' });

  if (!name || !description || typeof price !== 'number' || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const created = await Product.create({
    name,
    description,
    price,
    category,
    imageUrl,
    owner: userId,
  });

  res.status(201).json({
    id: created._id,
    name: created.name,
    description: created.description,
    price: created.price,
    category: created.category,
    imageUrl: created.imageUrl || '',
    availability: created.availability,
    owner: created.owner,
  });
};

// GET /api/products/mine
export const getMyProducts = async (req: Request, res: Response) => {
  const userId = (req as any).userId as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Not authorized' });

  const products = await Product.find({ owner: userId }).sort({ createdAt: -1 });
  res.json(products.map((p) => ({
    id: p._id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    imageUrl: p.imageUrl || '',
    availability: p.availability,
    owner: p.owner,
  })));
};