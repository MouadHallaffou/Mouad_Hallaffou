import { body, param, query, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User validation rules
export const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone cannot exceed 20 characters')
];

// Skill validation rules
export const validateSkill = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill name must be between 1 and 50 characters'),
  body('category')
    .isIn(['Frontend Development', 'Backend Development', 'DevOps & Tools', 'Design & UX', 'Mobile Development', 'Other'])
    .withMessage('Invalid skill category'),
  body('level')
    .isInt({ min: 0, max: 100 })
    .withMessage('Skill level must be between 0 and 100'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters')
];

// Project validation rules
export const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('shortDescription')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  body('image')
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('github')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be valid'),
  body('demo')
    .optional()
    .isURL()
    .withMessage('Demo URL must be valid'),
  body('category')
    .isIn(['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Design', 'Other'])
    .withMessage('Invalid project category'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each technology must be between 1 and 30 characters')
];

// Contact validation rules
export const validateContact = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone cannot exceed 20 characters'),
  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('bio')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Bio cannot exceed 1000 characters')
];

// Message validation rules
export const validateMessage = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// ID validation
export const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
];

// Pagination validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];
