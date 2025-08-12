import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'a-very-secret-key'
    ) as DecodedToken;

    // Attach userId to request in a type-safe way using a symbol
    // Fallback to casting to any to avoid the need for global type augmentation
    (req as any).userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};