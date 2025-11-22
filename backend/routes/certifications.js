import express from 'express';
import Certification from '../models/Certification.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/certifications
// @desc    Get all certifications (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find({ isActive: true }).sort({ order: 1, issueDate: -1 });
    res.json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/certifications/:id
// @desc    Get certification by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/certifications
// @desc    Create certification
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, data: certification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/certifications/:id
// @desc    Update certification
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.json({ success: true, data: certification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/certifications/:id
// @desc    Delete certification
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
