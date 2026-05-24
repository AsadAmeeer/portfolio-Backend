const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    longDescription: {
        type: String,
        trim: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/600x400?text=Project+Image'
    },
    liveUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop', 'ai', 'other'],
        default: 'web'
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

projectSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Project', projectSchema);