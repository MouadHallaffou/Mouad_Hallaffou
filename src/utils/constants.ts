// API Constants
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // User Management
  USERS: '/user',
  USER_STATS: '/user/stats/overview',
  
  // Skills
  SKILLS: '/skills',
  SKILLS_BY_CATEGORY: '/skills/category',
  
  // Projects
  PROJECTS: '/projects',
  FEATURED_PROJECTS: '/projects/featured',
  PROJECTS_BY_CATEGORY: '/projects/category',
  LIKE_PROJECT: '/projects/like',
  
  // Contact
  CONTACT: '/contact',
  CONTACT_STATS: '/contact/stats',
  CV_DOWNLOAD: '/contact/cv-download',
  
  // Messages
  MESSAGES: '/messages',
  MESSAGE_STATS: '/messages/stats/overview',
  MARK_READ: '/messages/read',
  REPLY: '/messages/reply',
} as const;

// Skill Categories
export const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'DevOps & Tools',
  'Design & UX',
  'Mobile Development',
  'Other'
] as const;

// Project Categories
export const PROJECT_CATEGORIES = [
  'Full Stack',
  'Frontend',
  'Backend',
  'Mobile',
  'Design',
  'Other'
] as const;

// Project Status
export const PROJECT_STATUS = [
  'completed',
  'in-progress',
  'planned'
] as const;

// Message Status
export const MESSAGE_STATUS = [
  'new',
  'read',
  'replied',
  'archived'
] as const;

// User Roles
export const USER_ROLES = [
  'admin',
  'user'
] as const;

// Color Options for Skills
export const SKILL_COLORS = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-orange-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-teal-500 to-cyan-500',
] as const;

// Icon Options for Skills
export const SKILL_ICONS = [
  'Code',
  'Command',
  'FileCode',
  'LayoutGrid',
  'Palette',
  'Layers',
  'Zap',
  'Server',
  'Database',
  'Globe',
  'BrainCircuit',
  'GitBranch',
  'Cloud',
  'Cpu',
  'Figma',
  'Brush',
  'Smartphone',
  'Users',
  'Monitor'
] as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  BIO_MAX_LENGTH: 500,
  DESCRIPTION_MAX_LENGTH: 1000,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  NOT_FOUND: '*',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'portfolio_token',
  THEME: 'portfolio_theme',
  USER_PREFERENCES: 'portfolio_user_preferences',
} as const;
