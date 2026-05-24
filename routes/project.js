const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { validateProject } = require('../middleware/validation');

// GET all projects (public)
router.get('/', async (req, res) => {
    try {
        const { featured, category, limit } = req.query;
        let query = {};

        if (featured === 'true') query.featured = true;
        if (category) query.category = category;

        let projectsQuery = Project.find(query).sort({ order: 1, createdAt: -1 });

        if (limit) projectsQuery = projectsQuery.limit(parseInt(limit));

        const projects = await projectsQuery;
        res.json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single project (public)
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST new project (admin only)
router.post('/', auth, validateProject, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT update project (admin only)
router.put('/:id', auth, validateProject, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE project (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;