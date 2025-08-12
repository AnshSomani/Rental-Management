import mongoose from 'mongoose';

// Defines the structure for documents in the 'quotations' collection
const quotationSchema = mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        lender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true }, // Price per day at the time of order
            },
        ],
        total: {
            type: Number,
            required: true,
        },
        deliveryCharge: {
            type: Number,
            required: true,
        },
        deliveryMethod: {
            type: String,
            required: true,
            enum: ['pickup', 'delivery'],
        },
        rentalPeriod: {
            from: { type: Date, required: true },
            to: { type: Date, required: true },
        },
        deliveryAddress: {
            type: String,
        },
        invoiceAddress: {
            type: String,
            required: true,
        },
        pickupAddress: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Quotation Sent', 'Reserved', 'Payment Request', 'PickedUp', 'Returned'],
            default: 'Pending',
        },
    },
    {
        // Automatically adds 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

const Quotation = mongoose.model('Quotation', quotationSchema);

export default Quotation;
