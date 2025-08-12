import Contact from '../models/contactModel.js';

/**
 * @desc    Submit a contact form inquiry
 * @route   POST /api/contact
 * @access  Public
 */
const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    try {
        const contactSubmission = await Contact.create({
            name,
            email,
            message,
        });

        if (contactSubmission) {
            res.status(201).json({
                _id: contactSubmission._id,
                name: contactSubmission.name,
                email: contactSubmission.email,
                message: 'Your message has been received. We will get back to you shortly.',
            });
        } else {
            res.status(400);
            throw new Error('Invalid submission data');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not save contact submission.' });
    }
};

export { submitContactForm };
