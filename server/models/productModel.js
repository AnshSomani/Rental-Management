import mongoose from 'mongoose';

// Defines the structure for documents in the 'products' collection
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        pickupAddress: {
            type: String,
            required: true,
        },
        priceList: {
            day: { type: Number, required: true },
            week: { type: Number, required: true },
            month: { type: Number, required: true },
        },
        terms: {
            type: String,
            required: true,
        },
        lender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Creates a reference to the User model
        },
        // You can add fields like rating and purchaseCount later
        // rating: { type: Number, required: true, default: 0 },
        // numReviews: { type: Number, required: true, default: 0 },
    },
    {
        // Automatically adds 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
