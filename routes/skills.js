const express = require('express');
const router = express.Router();
const Skill = require('../models/Skills');
const auth = require('../middleware/auth');

// GET all skills (public)
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find({ isVisible: true }).sort({ order: 1, category: 1 });
        res.json({ success: true, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET all skills for admin
router.get('/admin', auth, async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, order: 1 });
        res.json({ success: true, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST new skill (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json({ success: true, data: skill });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT update skill (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json({ success: true, data: skill });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE skill (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;