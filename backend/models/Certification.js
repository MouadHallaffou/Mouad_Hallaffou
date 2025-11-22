import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Certification name is required'],
    trim: true,
    maxlength: [150, 'Certification name cannot exceed 150 characters']
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true,
    maxlength: [100, 'Issuer cannot exceed 100 characters']
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required']
  },
  expiryDate: {
    type: Date
  },
  credentialId: {
    type: String,
    trim: true,
    maxlength: [100, 'Credential ID cannot exceed 100 characters']
  },
  credentialUrl: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  logo: {
    type: String,
    default: ''
  },
  skills: [{
    type: String,
    trim: true
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
certificationSchema.index({ isActive: 1, order: 1 });
certificationSchema.index({ issueDate: -1 });

// Virtual to check if certification is expired
certificationSchema.virtual('isExpired').get(function() {
  if (this.expiryDate) {
    return new Date() > this.expiryDate;
  }
  return false;
});

// Virtual to check if certification is expiring soon (within 3 months)
certificationSchema.virtual('isExpiringSoon').get(function() {
  if (this.expiryDate) {
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return this.expiryDate <= threeMonthsFromNow && this.expiryDate > new Date();
  }
  return false;
});

export default mongoose.model('Certification', certificationSchema);
