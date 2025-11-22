import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import skillRoutes from './routes/skills.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import messageRoutes from './routes/messages.js';
import personalInfoRoutes from './routes/personalInfo.js';
import educationRoutes from './routes/education.js';
import experienceRoutes from './routes/experience.js';
import certificationRoutes from './routes/certifications.js';
import technologyRoutes from './routes/technologies.js';
import socialLinkRoutes from './routes/socialLinks.js';
import resumeRoutes from './routes/resume.js';

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'dev-secret-change-me';
  process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Behind proxies (Render) to get correct req.ip
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration (place before rate limiting and routes)
const normalizeOrigin = (o) => (o || '').replace(/\/$/, '').trim();
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(o => normalizeOrigin(o));

app.use(cors({
  origin: (origin, callback) => {
    const incoming = normalizeOrigin(origin);
    const isAllowed = 
      !incoming ||
      allowedOrigins.includes(incoming) ||
      (process.env.NODE_ENV !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/.test(incoming));

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db')
  .then(async () => {
    console.log('Connected to MongoDB');

    const forceUpdate = (process.env.SEED_FORCE_UPDATE || 'false').toLowerCase() === 'true';
    if (process.env.NODE_ENV !== 'production' || forceUpdate) {
      const seedEmail = process.env.SEED_ADMIN_EMAIL;
      const seedPassword = process.env.SEED_ADMIN_PASSWORD;
      if (seedEmail && seedPassword) {
        const emailNorm = String(seedEmail).toLowerCase().trim();
        const existing = await User.findOne({ email: emailNorm });
        if (!existing) {
          const admin = new User({
            name: 'Admin',
            email: emailNorm,
            password: seedPassword,
            role: 'admin',
            isActive: true,
          });
          await admin.save();
          console.log('Seeded admin user:', emailNorm);
        } else if (forceUpdate) {
          existing.password = seedPassword;
          await existing.save();
          console.log('Updated admin password for:', emailNorm);
        }
      }
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/personalInfo', personalInfoRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/socialLinks', socialLinkRoutes);
app.use('/api/resume', resumeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
});

export default app;
