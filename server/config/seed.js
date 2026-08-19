import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Seed Error: ADMIN_USERNAME and ADMIN_PASSWORD must be defined in environment variables.');
    process.exit(1);
  }

  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ username: adminUsername });

    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists. Skipping creation (idempotent).`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);

      const createdAdmin = await Admin.create({
        username: adminUsername,
        passwordHash
      });

      console.log(`Admin user '${createdAdmin.username}' created successfully with ID: ${createdAdmin._id}`);
    }

    const totalAdmins = await Admin.countDocuments();
    console.log(`Total Admin documents in database: ${totalAdmins}`);

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
