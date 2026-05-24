require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const users = await User.find({});
        console.log('Users in database:', users);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

listUsers();
