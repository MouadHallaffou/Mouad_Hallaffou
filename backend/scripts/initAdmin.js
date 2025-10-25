import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const initAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      name: 'Mouad Hallaffou',
      email: process.env.ADMIN_EMAIL ,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
      bio: 'Portfolio Administrator',
      isActive: true
    };

    const admin = new User(adminData);
    await admin.save();

    console.log('Admin user created successfully');
    console.log('Email:', admin.email);
    console.log('Password:', process.env.ADMIN_PASSWORDcd);
    console.log('Please change the default password after first login!');

  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Run the script
initAdmin();
