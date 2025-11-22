import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  tagline: {
    type: String,
    trim: true,
    maxlength: [200, 'Tagline cannot exceed 200 characters']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [2000, 'Bio cannot exceed 2000 characters']
  },
  shortBio: {
    type: String,
    maxlength: [500, 'Short bio cannot exceed 500 characters']
  },
  avatar: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone cannot exceed 20 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  website: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  nationality: {
    type: String,
    trim: true,
    maxlength: [50, 'Nationality cannot exceed 50 characters']
  },
  languages: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['Native', 'Fluent', 'Intermediate', 'Basic'],
      required: true
    }
  }],
  availability: {
    type: String,
    enum: ['Available', 'Not Available', 'Open to Offers'],
    default: 'Open to Offers'
  },
  resumeFile: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
personalInfoSchema.index({ isActive: 1 });

export default mongoose.model('PersonalInfo', personalInfoSchema);
