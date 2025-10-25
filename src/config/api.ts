// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
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
};

// Request Headers
export const getAuthHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
  pagination?: {
    current: number;
    pages: number;
    total: number;
  };
}

// Error Handler
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};
