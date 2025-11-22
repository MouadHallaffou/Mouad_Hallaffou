import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true,
    maxlength: [150, 'Institution name cannot exceed 150 characters']
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true,
    maxlength: [100, 'Degree cannot exceed 100 characters']
  },
  field: {
    type: String,
    required: [true, 'Field of study is required'],
    trim: true,
    maxlength: [100, 'Field cannot exceed 100 characters']
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
  grade: {
    type: String,
    trim: true,
    maxlength: [50, 'Grade cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  logo: {
    type: String,
    default: ''
  },
  achievements: [{
    type: String,
    trim: true,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
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
educationSchema.index({ isActive: 1, order: 1 });
educationSchema.index({ current: 1 });

// Virtual for duration
educationSchema.virtual('duration').get(function() {
  if (this.current) {
    return 'Present';
  }
  if (this.startDate && this.endDate) {
    const years = Math.floor((this.endDate - this.startDate) / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(((this.endDate - this.startDate) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return `${years}y ${months}m`;
  }
  return null;
});

export default mongoose.model('Education', educationSchema);
