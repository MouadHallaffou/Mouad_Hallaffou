import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchUser = useCallback(async (authToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('portfolio_token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('portfolio_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('portfolio_token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('portfolio_token', data.token);
        return true;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('portfolio_token');
  };

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
