import { QueryClient } from '@tanstack/react-query';
import { apiClient } from '../functions/apiClient';

/**
 * API configuration and base utilities
 * Centralized API setup for TanStack Query
 */

// Base API configuration - now using environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Generic API request function (deprecated - use apiClient instead)
 * @deprecated Use apiClient from functions/apiClient.ts instead
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Protected API request function using the new apiClient
 * This is the recommended way to make API calls
 */
export const protectedApiRequest = {
  get: <T>(endpoint: string, params?: Record<string, any>) => 
    apiClient.get<T>(endpoint, params),
  
  post: <T>(endpoint: string, data?: any) => 
    apiClient.post<T>(endpoint, data),
  
  put: <T>(endpoint: string, data?: any) => 
    apiClient.put<T>(endpoint, data),
  
  patch: <T>(endpoint: string, data?: any) => 
    apiClient.patch<T>(endpoint, data),
  
  delete: <T>(endpoint: string) => 
    apiClient.delete<T>(endpoint),
  
  upload: <T>(endpoint: string, file: File, additionalData?: Record<string, any>) => 
    apiClient.upload<T>(endpoint, file, additionalData),
  
  download: (endpoint: string, filename?: string) => 
    apiClient.download(endpoint, filename)
};

/**
 * Query client configuration for TanStack Query
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

/**
 * Query keys for consistent caching
 */
export const queryKeys = {
  // User queries
  user: ['user'] as const,
  userProfile: (id: string) => ['user', 'profile', id] as const,
  
  // Lead queries
  leads: ['leads'] as const,
  lead: (id: string) => ['leads', id] as const,
  leadStats: ['leads', 'stats'] as const,
  
  // Contact queries
  contacts: ['contacts'] as const,
  contact: (id: string) => ['contacts', id] as const,
  contactStats: ['contacts', 'stats'] as const,
} as const;