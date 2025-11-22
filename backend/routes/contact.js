import express from 'express';
import Contact from '../models/Contact.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateContact, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Get contact information (public)
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne({ isActive: true });
    
    // Create default contact if none exists
    if (!contact) {
      contact = new Contact({
        email: 'mouadhallaffou@gmail.com',
        phone: '+212 6 78 63 42 85',
        location: 'Morocco',
        bio: 'Passionate Full Stack Web Developer currently training at YOUCODE Maroc.',
        socialLinks: {
          github: 'https://github.com/MouadHallaffou',
          linkedin: 'https://linkedin.com/in/hallaffou-mouad',
          website: ''
        }
      });
      await contact.save();
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update contact information (Admin only)
router.put('/', authenticateToken, requireAdmin, validateContact, handleValidationErrors, async (req, res) => {
  try {
    let contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      contact = new Contact(req.body);
    } else {
      Object.assign(contact, req.body);
    }
    
    await contact.save();

    res.json({
      success: true,
      message: 'Contact information updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update social links (Admin only)
router.put('/social-links', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { socialLinks } = req.body;
    
    if (!socialLinks || typeof socialLinks !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Social links must be an object'
      });
    }

    let contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      contact = new Contact({ socialLinks });
    } else {
      contact.socialLinks = { ...contact.socialLinks, ...socialLinks };
    }
    
    await contact.save();

    res.json({
      success: true,
      message: 'Social links updated successfully',
      data: contact.socialLinks
    });
  } catch (error) {
    console.error('Update social links error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update bio (Admin only)
router.put('/bio', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { bio } = req.body;
    
    if (!bio || typeof bio !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Bio is required and must be a string'
      });
    }

    if (bio.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Bio cannot exceed 1000 characters'
      });
    }

    let contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      contact = new Contact({ bio });
    } else {
      contact.bio = bio;
    }
    
    await contact.save();

    res.json({
      success: true,
      message: 'Bio updated successfully',
      data: { bio: contact.bio }
    });
  } catch (error) {
    console.error('Update bio error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update resume (Admin only)
router.put('/resume', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { resume } = req.body;
    
    if (!resume || typeof resume !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Resume URL is required and must be a string'
      });
    }

    let contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      contact = new Contact({ resume });
    } else {
      contact.resume = resume;
    }
    
    await contact.save();

    res.json({
      success: true,
      message: 'Resume updated successfully',
      data: { resume: contact.resume }
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Increment CV download count
router.post('/cv-download', async (req, res) => {
  try {
    let contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact information not found'
      });
    }

    contact.cvDownloadCount += 1;
    await contact.save();

    res.json({
      success: true,
      message: 'Download count incremented',
      data: { cvDownloadCount: contact.cvDownloadCount }
    });
  } catch (error) {
    console.error('Increment CV download error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get contact statistics (Admin only)
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact information not found'
      });
    }

    res.json({
      success: true,
      data: {
        cvDownloadCount: contact.cvDownloadCount,
        lastUpdated: contact.updatedAt
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
