import express from 'express';
import PersonalInfo from '../models/PersonalInfo.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/personalInfo
// @desc    Get all personal info (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: personalInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/personalInfo/active
// @desc    Get active personal info (public)
// @access  Public
router.get('/active', async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!personalInfo) {
      return res.status(404).json({ success: false, message: 'No active personal info found' });
    }
    res.json({ success: true, data: personalInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/personalInfo/:id
// @desc    Get personal info by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findById(req.params.id);
    if (!personalInfo) {
      return res.status(404).json({ success: false, message: 'Personal info not found' });
    }
    res.json({ success: true, data: personalInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/personalInfo
// @desc    Create personal info
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.create(req.body);
    res.status(201).json({ success: true, data: personalInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/personalInfo/:id
// @desc    Update personal info
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!personalInfo) {
      return res.status(404).json({ success: false, message: 'Personal info not found' });
    }
    res.json({ success: true, data: personalInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/personalInfo/:id
// @desc    Delete personal info
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findByIdAndDelete(req.params.id);
    if (!personalInfo) {
      return res.status(404).json({ success: false, message: 'Personal info not found' });
    }
    res.json({ success: true, message: 'Personal info deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
