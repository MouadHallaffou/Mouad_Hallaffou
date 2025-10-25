import { apiService } from './api';
import { LoginCredentials, AuthResponse, User, ChangePasswordData } from '../types/auth';

export class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      // Store token in localStorage
      localStorage.setItem('portfolio_token', response.data.token);
      return response.data;
    }
    
    throw new Error(response.message || 'Login failed');
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove token from localStorage
      localStorage.removeItem('portfolio_token');
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to get user');
  }

  // Update profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Profile update failed');
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<void> {
    const response = await apiService.put('/auth/change-password', data);
    
    if (!response.success) {
      throw new Error(response.message || 'Password change failed');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('portfolio_token');
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('portfolio_token');
  }

  // Check if user is admin
  async isAdmin(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user.role === 'admin';
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
