require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@yourportfolio.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        const admin = new User({
            name: 'Admin',
            email: adminEmail,
            password: 'password123', // Admin password
            role: 'admin'
        });

        await admin.save();
        console.log(`Admin user created successfully!`);
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: password123`);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
