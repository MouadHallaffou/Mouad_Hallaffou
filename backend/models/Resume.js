import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section name is required'],
    trim: true,
    enum: ['Summary', 'Skills', 'Experience', 'Education', 'Projects', 'Certifications', 'Custom'],
    default: 'Custom'
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
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
resumeSchema.index({ section: 1, isActive: 1 });
resumeSchema.index({ order: 1 });

export default mongoose.model('Resume', resumeSchema);
