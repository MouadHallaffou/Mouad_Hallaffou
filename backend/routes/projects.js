import express from 'express';
import Project from '../models/Project.js';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth.js';
import { validateProject, validateId, validatePagination, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Get all projects (public)
router.get('/', optionalAuth, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category = '', 
      featured = '', 
      search = '',
      status = ''
    } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    if (featured !== '') {
      query.featured = featured === 'true';
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    // Get categories for filtering
    const categories = await Project.distinct('category', { isActive: true });

    res.json({
      success: true,
      data: projects,
      categories,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get featured projects (public)
router.get('/featured', optionalAuth, async (req, res) => {
  try {
    const projects = await Project.find({ 
      featured: true, 
      isActive: true 
    })
    .sort({ order: 1, createdAt: -1 })
    .limit(6);

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get project by ID
router.get('/:id', optionalAuth, validateId, handleValidationErrors, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project || !project.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment view count
    project.views += 1;
    await project.save();

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create project (Admin only)
router.post('/', authenticateToken, requireAdmin, validateProject, handleValidationErrors, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update project (Admin only)
router.put('/:id', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete project (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Toggle featured status (Admin only)
router.put('/:id/featured', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.featured = !project.featured;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      data: project
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update project order (Admin only)
router.put('/:id/order', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const { order } = req.body;
    
    if (typeof order !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Order must be a number'
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { order },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project order updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Like project (public)
router.post('/:id/like', optionalAuth, validateId, handleValidationErrors, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project || !project.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.likes += 1;
    await project.save();

    res.json({
      success: true,
      message: 'Project liked successfully',
      data: { likes: project.likes }
    });
  } catch (error) {
    console.error('Like project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get projects by category
router.get('/category/:category', optionalAuth, async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ 
      category, 
      isActive: true 
    }).sort({ featured: -1, order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get projects by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
