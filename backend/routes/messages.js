import express from 'express';
import Message from '../models/Message.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateMessage, validateId, validatePagination, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Get all messages (Admin only)
router.get('/', authenticateToken, requireAdmin, validatePagination, handleValidationErrors, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status = '', 
      search = '',
      isRead = ''
    } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }
    if (isRead !== '') {
      query.isRead = isRead === 'true';
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Message.countDocuments(query);

    // Get statistics
    const stats = {
      total: await Message.countDocuments(),
      new: await Message.countDocuments({ status: 'new' }),
      read: await Message.countDocuments({ isRead: true }),
      replied: await Message.countDocuments({ status: 'replied' })
    };

    res.json({
      success: true,
      data: messages,
      stats,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get message by ID (Admin only)
router.get('/:id', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Mark as read if not already
    if (!message.isRead) {
      message.isRead = true;
      message.readAt = new Date();
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create message (public)
router.post('/', validateMessage, handleValidationErrors, async (req, res) => {
  try {
    const messageData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const message = new Message(messageData);
    await message.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: message._id,
        name: message.name,
        email: message.email,
        subject: message.subject,
        createdAt: message.createdAt
      }
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update message status (Admin only)
router.put('/:id/status', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        isRead: status === 'read' || status === 'replied',
        readAt: status === 'read' || status === 'replied' ? new Date() : undefined
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message status updated successfully',
      data: message
    });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Reply to message (Admin only)
router.put('/:id/reply', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const { replyMessage } = req.body;
    
    if (!replyMessage || typeof replyMessage !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    if (replyMessage.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Reply message cannot exceed 1000 characters'
      });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        replyMessage,
        status: 'replied',
        repliedAt: new Date(),
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Reply to message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete message (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Mark message as read (Admin only)
router.put('/:id/read', authenticateToken, requireAdmin, validateId, handleValidationErrors, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true,
        readAt: new Date(),
        status: 'read'
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    console.error('Mark message as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get message statistics (Admin only)
router.get('/stats/overview', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stats = {
      total: await Message.countDocuments(),
      new: await Message.countDocuments({ status: 'new' }),
      read: await Message.countDocuments({ isRead: true }),
      replied: await Message.countDocuments({ status: 'replied' }),
      archived: await Message.countDocuments({ status: 'archived' }),
      today: await Message.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }),
      thisWeek: await Message.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      thisMonth: await Message.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get message stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
