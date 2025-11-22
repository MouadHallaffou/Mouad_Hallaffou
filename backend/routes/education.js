import express from 'express';
import Education from '../models/Education.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/education
// @desc    Get all education entries (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find({ isActive: true }).sort({ order: 1, startDate: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/education/:id
// @desc    Get education by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/education
// @desc    Create education entry
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/education/:id
// @desc    Update education entry
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/education/:id
// @desc    Delete education entry
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
