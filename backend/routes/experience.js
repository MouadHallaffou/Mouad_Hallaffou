import express from 'express';
import Experience from '../models/Experience.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/experience
// @desc    Get all experience entries (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find({ isActive: true }).sort({ order: 1, startDate: -1 });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/experience/:id
// @desc    Get experience by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/experience
// @desc    Create experience entry
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/experience/:id
// @desc    Update experience entry
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/experience/:id
// @desc    Delete experience entry
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
