import Contact from '../models/contact.model.js';

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, budget, projectType, subject, message, otherSubject } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            budget,
            projectType,
            subject,
            message,
            otherSubject
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Contact query submitted successfully',
            data: newContact
        });
    } catch (error) {
        console.error('Error in createContact:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Failed to submit contact query',
            error: error.message
        });
    }
};
