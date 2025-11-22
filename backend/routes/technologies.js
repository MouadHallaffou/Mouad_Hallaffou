import express from 'express';
import Technology from '../models/Technology.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/technologies
// @desc    Get all technologies (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, favorite } = req.query;
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (favorite === 'true') filter.isFavorite = true;
    
    const technologies = await Technology.find(filter)
      .populate('relatedProjects', 'title image')
      .sort({ order: 1, proficiency: -1 });
    
    res.json({ success: true, data: technologies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/technologies/categories
// @desc    Get all technology categories (public)
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Technology.distinct('category', { isActive: true });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/technologies/:id
// @desc    Get technology by ID (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id).populate('relatedProjects');
    if (!technology) {
      return res.status(404).json({ success: false, message: 'Technology not found' });
    }
    res.json({ success: true, data: technology });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/technologies
// @desc    Create technology
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const technology = await Technology.create(req.body);
    res.status(201).json({ success: true, data: technology });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/technologies/:id
// @desc    Update technology
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!technology) {
      return res.status(404).json({ success: false, message: 'Technology not found' });
    }
    res.json({ success: true, data: technology });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/technologies/:id
// @desc    Delete technology
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);
    if (!technology) {
      return res.status(404).json({ success: false, message: 'Technology not found' });
    }
    res.json({ success: true, message: 'Technology deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
