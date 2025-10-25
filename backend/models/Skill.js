import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['Frontend Development', 'Backend Development', 'DevOps & Tools', 'Design & UX', 'Mobile Development', 'Other'],
    default: 'Other'
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [0, 'Skill level cannot be less than 0'],
    max: [100, 'Skill level cannot exceed 100']
  },
  icon: {
    type: String,
    default: 'Code'
  },
  color: {
    type: String,
    default: 'from-blue-500 to-cyan-500'
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
skillSchema.index({ category: 1, isActive: 1 });
skillSchema.index({ order: 1 });

export default mongoose.model('Skill', skillSchema);
