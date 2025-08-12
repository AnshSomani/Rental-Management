import mongoose from 'mongoose';

// Defines the structure for documents in the 'contacts' collection
const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        // Automatically adds 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
