import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Technology name is required'],
    trim: true,
    maxlength: [50, 'Technology name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Programming Language',
      'Frontend Framework',
      'Backend Framework',
      'Database',
      'DevOps & Tools',
      'Cloud Platform',
      'Mobile Development',
      'Design & UX',
      'Testing',
      'Other'
    ],
    default: 'Other'
  },
  icon: {
    type: String,
    default: 'Code'
  },
  color: {
    type: String,
    default: 'from-blue-500 to-cyan-500'
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [0, 'Proficiency cannot be less than 0'],
    max: [100, 'Proficiency cannot exceed 100']
  },
  yearsOfExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  relatedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  isFavorite: {
    type: Boolean,
    default: false
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
technologySchema.index({ category: 1, isActive: 1 });
technologySchema.index({ isFavorite: 1, isActive: 1 });
technologySchema.index({ order: 1 });

// Virtual for proficiency level label
technologySchema.virtual('proficiencyLevel').get(function() {
  if (this.proficiency >= 90) return 'Expert';
  if (this.proficiency >= 70) return 'Advanced';
  if (this.proficiency >= 50) return 'Intermediate';
  if (this.proficiency >= 30) return 'Beginner';
  return 'Learning';
});

export default mongoose.model('Technology', technologySchema);
