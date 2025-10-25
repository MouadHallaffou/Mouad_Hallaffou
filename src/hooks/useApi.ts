import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
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

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const useApi = <T = any>(
  endpoint: string,
  options: UseApiOptions = {}
) => {
  const { token } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (customEndpoint?: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE_URL}${customEndpoint || endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      const result: ApiResponse<T> = await response.json();
      
      if (result.success) {
        setData(result.data || null);
        options.onSuccess?.(result.data);
      } else {
        throw new Error(result.message || 'Request failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [endpoint, token]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export const useApiMutation = <T = any>(endpoint: string) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
    body?: any,
    customEndpoint?: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE_URL}${customEndpoint || endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      const result: ApiResponse<T> = await response.json();
      
      if (result.success) {
        return result.data || null;
      } else {
        throw new Error(result.message || 'Request failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate,
  };
};

// Specific hooks for different resources
export const useSkills = (category?: string) => {
  const endpoint = category ? `/skills/category/${category}` : '/skills';
  return useApi(endpoint);
};

export const useProjects = (featured?: boolean) => {
  const endpoint = featured ? '/projects/featured' : '/projects';
  return useApi(endpoint);
};

export const useContact = () => {
  return useApi('/contact');
};

export const useMessages = () => {
  return useApi('/messages');
};

export const useUsers = () => {
  return useApi('/user');
};
