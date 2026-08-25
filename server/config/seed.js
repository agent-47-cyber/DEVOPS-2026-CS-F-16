import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

dotenv.config();

const SAMPLE_PROJECTS = [
  {
    title: 'DevScope AI',
    description: 'An AI-powered developer intelligence platform providing real-time code analysis, intelligent architecture inspection, automated workflow insights, and interactive developer tooling.',
    techStack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Node.js', 'REST APIs', 'AI Integration', 'Vercel'],
    repoUrl: 'https://github.com/agent-47-cyber',
    liveUrl: 'https://devscopeai-nine.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 1
  },
  {
    title: 'My Portfolio Station',
    description: 'An interactive 3D futuristic observation station portfolio floating in deep space. Features immersive spatial audio, interactive controls, and 3D web environments.',
    techStack: ['Three.js', 'WebGL', 'React', 'Cloudflare Workers', 'Tailwind CSS', 'JavaScript (ES6+)'],
    repoUrl: 'https://github.com/agent-47-cyber',
    liveUrl: 'https://yatin-portfolio.khandelwalyatin2.workers.dev/',
    imageUrl: '/orbit-station.jpg',
    featured: true,
    order: 2
  },
  {
    title: 'Automated CI/CD & Cloud Infrastructure',
    description: 'Production-grade declarative automation pipeline orchestrating GitHub webhook triggers, automated multi-stage Docker image builds, code quality & security testing gates, and seamless multi-container cluster deployments.',
    techStack: ['Jenkins', 'Docker', 'Kubernetes', 'GitHub Actions', 'Linux / Bash', 'Nginx'],
    repoUrl: 'https://github.com/agent-47-cyber/collge_portfolio',
    liveUrl: 'https://github.com/agent-47-cyber/collge_portfolio',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 3
  },
  {
    title: 'Distributed Observability & Telemetry Hub',
    description: 'Real-time application performance monitoring infrastructure instrumented with Prometheus client metrics, Grafana visualization dashboards, request rate histograms, latency tracking, and threshold alerts.',
    techStack: ['Prometheus', 'Grafana', 'Node.js', 'Express', 'Docker'],
    repoUrl: 'https://github.com/agent-47-cyber',
    liveUrl: 'https://github.com/agent-47-cyber',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 4
  }
];

const SAMPLE_SKILLS = [
  // Frontend
  { name: 'React', category: 'Frontend Development', level: 'Advanced' },
  { name: 'JavaScript (ES6+)', category: 'Frontend Development', level: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend Development', level: 'Advanced' },
  { name: 'HTML5 & CSS3', category: 'Frontend Development', level: 'Advanced' },
  { name: 'React Router', category: 'Frontend Development', level: 'Proficient' },
  { name: 'Redux Toolkit', category: 'Frontend Development', level: 'Proficient' },

  // Backend
  { name: 'Node.js', category: 'Backend & APIs', level: 'Advanced' },
  { name: 'Express.js', category: 'Backend & APIs', level: 'Advanced' },
  { name: 'REST APIs', category: 'Backend & APIs', level: 'Advanced' },
  { name: 'MongoDB', category: 'Backend & APIs', level: 'Proficient' },
  { name: 'Mongoose ODM', category: 'Backend & APIs', level: 'Proficient' },
  { name: 'JWT & Authentication', category: 'Backend & APIs', level: 'Proficient' },

  // DevOps & Cloud
  { name: 'Docker', category: 'DevOps & Cloud Automation', level: 'Proficient' },
  { name: 'Kubernetes', category: 'DevOps & Cloud Automation', level: 'Proficient' },
  { name: 'Jenkins CI/CD', category: 'DevOps & Cloud Automation', level: 'Proficient' },
  { name: 'Git & Version Control', category: 'DevOps & Cloud Automation', level: 'Advanced' },
  { name: 'Prometheus & Grafana', category: 'DevOps & Cloud Automation', level: 'Intermediate' },
  { name: 'Linux / Bash Scripting', category: 'DevOps & Cloud Automation', level: 'Proficient' },

  // Methodology
  { name: 'Automated Testing', category: 'Methodology & Engineering', level: 'Proficient' },
  { name: 'Microservices Architecture', category: 'Methodology & Engineering', level: 'Intermediate' },
  { name: 'Performance Monitoring', category: 'Methodology & Engineering', level: 'Intermediate' },
  { name: 'Agile & DevOps Culture', category: 'Methodology & Engineering', level: 'Advanced' }
];

const seedData = async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Seed Error: ADMIN_USERNAME and ADMIN_PASSWORD must be defined in environment variables.');
    process.exit(1);
  }

  try {
    await connectDB();

    // 1. Seed Admin
    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists. Skipping.`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);
      await Admin.create({ username: adminUsername, passwordHash });
      console.log(`Admin user '${adminUsername}' created successfully.`);
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(SAMPLE_PROJECTS);
      console.log(`Seeded ${SAMPLE_PROJECTS.length} sample projects.`);
    } else {
      console.log(`Database already has ${projectCount} projects. Skipping project seed.`);
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(SAMPLE_SKILLS);
      console.log(`Seeded ${SAMPLE_SKILLS.length} sample skills.`);
    } else {
      console.log(`Database already has ${skillCount} skills. Skipping skill seed.`);
    }

    console.log('Database seeding completed successfully.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
