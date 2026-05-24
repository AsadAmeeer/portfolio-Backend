const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendEmail } = require('../config/nodemailer');
const auth = require('../middleware/auth');

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = new Contact({ name, email, subject, message });
        await contact.save();

        // Send email notification to admin
        const emailHtml = `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        await sendEmail(process.env.ADMIN_EMAIL, 'New Portfolio Contact', emailHtml);

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all messages (admin only)
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update message status (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { status, repliedAt: status === 'replied' ? Date.now() : undefined },
            { new: true }
        );
        res.json({ success: true, data: message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete message (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;