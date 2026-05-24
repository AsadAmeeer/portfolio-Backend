const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Project = require('./models/Project');
    const projects = await Project.find();
    for (let p of projects) {
        let keyword = 'tech';
        const lowerTitle = p.title.toLowerCase();
        if (lowerTitle.includes('hotel')) keyword = 'hotel';
        else if (lowerTitle.includes('chat')) keyword = 'chat';
        else if (lowerTitle.includes('network')) keyword = 'network';
        else if (lowerTitle.includes('ai') || lowerTitle.includes('expert')) keyword = 'ai';
        
        p.imageUrl = `https://loremflickr.com/600/400/${keyword}`;
        await p.save();
    }
    console.log('Images updated successfully');
    process.exit(0);
});
