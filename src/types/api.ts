// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
  pagination?: Pagination;
}

export interface ApiError {
  field: string;
  message: string;
  value?: any;
}

export interface Pagination {
  current: number;
  pages: number;
  total: number;
}

// Request Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  category?: string;
  status?: string;
  featured?: boolean;
  isActive?: boolean;
}
