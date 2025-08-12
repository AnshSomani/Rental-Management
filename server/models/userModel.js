import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Defines the structure for documents in the 'users' collection
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures no two users can have the same email
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['customer', 'lender'], // Restricts the role to one of these two values
            default: 'customer',
        },
    },
    {
        // Automatically adds 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

// Middleware that runs before a user document is saved
// This is used to hash the password
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        next();
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare an entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
