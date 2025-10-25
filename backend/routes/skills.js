import express from 'express';
import Skill from '../models/Skill.js';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth.js';
import { validateSkill, validateId, validatePagination, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Get all skills (public)
router.get('/', optionalAuth, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const { page = 1, limit = 20, category = '', search = '' } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const skills = await Skill.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Skill.countDocuments(query);

    // Get categories for filtering
    const categories = await Skill.distinct('category', { isActive: true });

    res.json({
      success: true,
      data: skills,
      categories,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get skill by ID
router.get('/:id', optionalAuth, validateId, handleValidationErrors, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill || !skill.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create skill (Admin only)
router.post('/', authenticateToken, requireAdmin, validateSkill, handleValidationErrors, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update skill (Admin only)
router.put('/:id', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete skill (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update skill order (Admin only)
router.put('/:id/order', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const { order } = req.body;
    
    if (typeof order !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Order must be a number'
      });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { order },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill order updated successfully',
      data: skill
    });
  } catch (error) {
    console.error('Update skill order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Toggle skill status (Admin only)
router.put('/:id/toggle', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    skill.isActive = !skill.isActive;
    await skill.save();

    res.json({
      success: true,
      message: `Skill ${skill.isActive ? 'activated' : 'deactivated'} successfully`,
      data: skill
    });
  } catch (error) {
    console.error('Toggle skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get skills by category
router.get('/category/:category', optionalAuth, async (req, res) => {
  try {
    const { category } = req.params;
    const skills = await Skill.find({ 
      category, 
      isActive: true 
    }).sort({ order: 1, level: -1 });

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error('Get skills by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
