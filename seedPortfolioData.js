require('dotenv').config();
const mongoose = require('mongoose');
const Skill = require('./models/Skills');
const Project = require('./models/Project');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing data
        await Skill.deleteMany({});
        await Project.deleteMany({});

        // Define Skills
        const skills = [
            { name: 'C++', category: 'frontend', proficiency: 85, isVisible: true },
            { name: 'Java', category: 'backend', proficiency: 80, isVisible: true },
            { name: 'Python', category: 'backend', proficiency: 75, isVisible: true },
            { name: 'OOP', category: 'soft', proficiency: 90, isVisible: true },
            { name: 'SQL', category: 'database', proficiency: 85, isVisible: true },
            { name: 'MySQL Workbench', category: 'tools', proficiency: 80, isVisible: true },
            { name: 'HTML/CSS', category: 'frontend', proficiency: 75, isVisible: true },
            { name: 'Networking (TCP/IP)', category: 'devops', proficiency: 80, isVisible: true },
            { name: 'Cisco Packet Tracer', category: 'tools', proficiency: 85, isVisible: true },
            { name: 'Cybersecurity Concepts', category: 'devops', proficiency: 70, isVisible: true },
            { name: 'Data Structures', category: 'soft', proficiency: 85, isVisible: true }
        ];

        // Define Projects
        const projects = [
            {
                title: 'Hotel Management System',
                description: 'Developed a management system project using programming concepts. Implemented modules for managing customer records, bookings, and billing.',
                technologies: ['Python', 'HTML', 'CSS'],
                category: 'web',
                githubUrl: '#',
                liveUrl: '#',
                imageUrl: 'https://via.placeholder.com/800x600?text=Hotel+Management+System',
                featured: true
            },
            {
                title: 'Expert System (Rule-Based AI)',
                description: 'Designed a rule-based reasoning system using if-else logic and structured knowledge base. Implemented decision-making using inference rules.',
                technologies: ['Python', 'AI'],
                category: 'ai',
                githubUrl: '#',
                liveUrl: '#',
                imageUrl: 'https://via.placeholder.com/800x600?text=Expert+System',
                featured: true
            },
            {
                title: 'Client-Server Chat Application',
                description: 'Built a chat-based communication system using socket programming. Applied client-server architecture and networking fundamentals.',
                technologies: ['C++', 'Python', 'Sockets'],
                category: 'other',
                githubUrl: '#',
                liveUrl: '#',
                imageUrl: 'https://via.placeholder.com/800x600?text=Chat+Application',
                featured: true
            },
            {
                title: 'Networking Simulation Projects',
                description: 'Designed and configured network topologies using Cisco Packet Tracer. Applied subnetting, IP allocation, and routing protocols.',
                technologies: ['Cisco Packet Tracer', 'Networking'],
                category: 'other',
                githubUrl: '#',
                liveUrl: '#',
                imageUrl: 'https://via.placeholder.com/800x600?text=Network+Simulation',
                featured: false
            }
        ];

        await Skill.insertMany(skills);
        await Project.insertMany(projects);

        console.log('Portfolio data successfully seeded!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
