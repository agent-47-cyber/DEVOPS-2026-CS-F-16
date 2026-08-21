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
    title: 'Fullstack Portfolio & DevOps Platform',
    description: 'A modern, fullstack personal portfolio with an integrated content management admin system, built as a DevOps-methodology capstone project for B.Tech (RTU). Features automated Jenkins CI/CD, multi-stage Docker containerization, and Kubernetes cluster orchestration.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Docker', 'Kubernetes', 'Jenkins', 'Prometheus'],
    repoUrl: 'https://github.com/agent-47-cyber/collge_portfolio',
    liveUrl: 'http://localhost:5173',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 1
  },
  {
    title: 'Kubernetes Microservices Mesh',
    description: 'Declarative Kubernetes architecture configuring multi-tier Pods, ClusterIP/NodePort Services, ConfigMaps, Secrets, and automated health probes for resilient service scaling.',
    techStack: ['Kubernetes', 'Docker', 'Node.js', 'Nginx'],
    repoUrl: 'https://github.com/agent-47-cyber/k8s-microservices',
    liveUrl: 'https://k8s-demo.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 2
  },
  {
    title: 'Prometheus & Grafana Telemetry Hub',
    description: 'Real-time observability system instrumented with prom-client to monitor HTTP traffic rates, latency histograms, error thresholds, and Node process health in Grafana dashboards.',
    techStack: ['Prometheus', 'Grafana', 'Node.js', 'Express'],
    repoUrl: 'https://github.com/agent-47-cyber/prometheus-telemetry',
    liveUrl: 'https://grafana-demo.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 3
  },
  {
    title: 'Declarative CI/CD Jenkins Pipeline',
    description: 'Multi-stage automated pipeline orchestrating source checkout, dependency caching, lint verification, production Vite build, and automated test execution with feedback notifications.',
    techStack: ['Jenkins', 'Git', 'Bash', 'Docker'],
    repoUrl: 'https://github.com/agent-47-cyber/jenkins-pipeline',
    liveUrl: 'https://jenkins-demo.example.com',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
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
