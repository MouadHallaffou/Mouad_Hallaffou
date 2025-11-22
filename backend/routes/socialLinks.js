import express from 'express';
import SocialLink from '../models/SocialLink.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/socialLinks
// @desc    Get all social links (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const socialLinks = await SocialLink.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: socialLinks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/socialLinks/:id
// @desc    Get social link by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const socialLink = await SocialLink.findById(req.params.id);
    if (!socialLink) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    res.json({ success: true, data: socialLink });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/socialLinks
// @desc    Create social link
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const socialLink = await SocialLink.create(req.body);
    res.status(201).json({ success: true, data: socialLink });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/socialLinks/:id
// @desc    Update social link
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!socialLink) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    res.json({ success: true, data: socialLink });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/socialLinks/:id
// @desc    Delete social link
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndDelete(req.params.id);
    if (!socialLink) {
      return res.status(404).json({ success: false, message: 'Social link not found' });
    }
    res.json({ success: true, message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
