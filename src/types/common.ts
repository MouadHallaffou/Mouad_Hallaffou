// Common Types
export interface ContactInfo {
  _id: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLinks;
  bio?: string;
  resume?: string;
  cvDownloadCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  instagram?: string;
  youtube?: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  ipAddress?: string;
  userAgent?: string;
  isRead: boolean;
  readAt?: string;
  replyMessage?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageStatus = 
  | 'new'
  | 'read'
  | 'replied'
  | 'archived';

export interface CreateMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ReplyMessageData {
  replyMessage: string;
}

// Dashboard Stats
export interface DashboardStats {
  users: {
    total: number;
    active: number;
    admin: number;
    recent: number;
  };
  messages: {
    total: number;
    new: number;
    read: number;
    replied: number;
    archived: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  projects: {
    total: number;
    featured: number;
    views: number;
    likes: number;
  };
  skills: {
    total: number;
    categories: number;
  };
}

// Form Types
export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}
