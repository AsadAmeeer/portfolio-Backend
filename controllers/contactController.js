const Contact = require('../models/Contact');
const { sendEmail } = require('../config/nodemailer');

exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = new Contact({ name, email, subject, message });
        await contact.save();

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
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};