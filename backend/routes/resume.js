import express from 'express';
import Resume from '../models/Resume.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/resume
// @desc    Get all resume sections (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { section } = req.query;
    const filter = { isActive: true };
    
    if (section) filter.section = section;
    
    const resume = await Resume.find(filter).sort({ order: 1 });
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/resume/:id
// @desc    Get resume section by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume section not found' });
    }
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/resume
// @desc    Create resume section
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/resume/:id
// @desc    Update resume section
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume section not found' });
    }
    res.json({ success: true, data: resume });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/resume/:id
// @desc    Delete resume section
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume section not found' });
    }
    res.json({ success: true, message: 'Resume section deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
