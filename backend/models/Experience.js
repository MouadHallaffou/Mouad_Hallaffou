import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [150, 'Company name cannot exceed 150 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  responsibilities: [{
    type: String,
    trim: true,
    maxlength: [300, 'Responsibility cannot exceed 300 characters']
  }],
  achievements: [{
    type: String,
    trim: true,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  logo: {
    type: String,
    default: ''
  },
  companyWebsite: {
    type: String,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    default: 'Full-time'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
experienceSchema.index({ isActive: 1, order: 1 });
experienceSchema.index({ current: 1 });
experienceSchema.index({ employmentType: 1 });

// Virtual for duration
experienceSchema.virtual('duration').get(function() {
  const endDate = this.current ? new Date() : this.endDate;
  if (this.startDate && endDate) {
    const years = Math.floor((endDate - this.startDate) / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(((endDate - this.startDate) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return `${years}y ${months}m`;
  }
  return null;
});

export default mongoose.model('Experience', experienceSchema);
