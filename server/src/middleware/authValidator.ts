import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

// Middleware to run the validation checks
const runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for user registration
export const registerValidator = [
  check('fullName', 'Full name is required').not().isEmpty().trim(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  runValidation,
];

// Validation rules for user login
export const loginValidator = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
  check('role', 'Role is required').isIn(['customer', 'lender']),
  runValidation,
];
