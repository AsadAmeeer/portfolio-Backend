const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'soft'],
        required: true
    },
    proficiency: {
        type: Number,
        min: 0,
        max: 100,
        default: 80
    },
    icon: {
        type: String,
        default: ''
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    isVisible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);