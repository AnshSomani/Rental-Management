import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User'; // Import the User interface

// Interface to define the properties of a Product document
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number; // Price per day
  category: string;
  imageUrl?: string;
  availability: boolean;
  owner: IUser['_id']; // Reference to the User who is the lender
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Creates a reference to the User model
    required: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
