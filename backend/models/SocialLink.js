import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, 'Platform name is required'],
    trim: true,
    enum: [
      'GitHub',
      'LinkedIn',
      'Twitter',
      'Facebook',
      'Instagram',
      'YouTube',
      'Medium',
      'Dev.to',
      'Stack Overflow',
      'CodePen',
      'Dribbble',
      'Behance',
      'Portfolio',
      'Blog',
      'Other'
    ]
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  username: {
    type: String,
    trim: true,
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  icon: {
    type: String,
    default: 'Link'
  },
  color: {
    type: String,
    default: '#3b82f6'
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
socialLinkSchema.index({ isActive: 1, order: 1 });
socialLinkSchema.index({ platform: 1 });

// Pre-save hook to extract username from URL if not provided
socialLinkSchema.pre('save', function(next) {
  if (!this.username && this.url) {
    // Extract username from common social media URL patterns
    const patterns = {
      GitHub: /github\.com\/([^\/]+)/,
      LinkedIn: /linkedin\.com\/in\/([^\/]+)/,
      Twitter: /twitter\.com\/([^\/]+)/,
      Instagram: /instagram\.com\/([^\/]+)/,
      Facebook: /facebook\.com\/([^\/]+)/
    };
    
    const pattern = patterns[this.platform];
    if (pattern) {
      const match = this.url.match(pattern);
      if (match && match[1]) {
        this.username = match[1];
      }
    }
  }
  next();
});

export default mongoose.model('SocialLink', socialLinkSchema);
