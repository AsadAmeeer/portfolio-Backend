const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to database
//connectDB();
let isConnected = false;
async function connectToMongoDB() {
    if (isConnected) {
        console.log("Already connected")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
        isConnected = true
        console.log("Connected to MongoDB")
    }
    catch (error) {
        console.log(error)
    }
}
const app = express();

// Middleware
app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectToMongoDB();
    }
    next();
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', require('./routes/project'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/user', require('./routes/user'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`📍 Environment: ${process.env.NODE_ENV}`);
// });

module.exports = app;