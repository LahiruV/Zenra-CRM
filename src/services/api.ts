import { QueryClient } from '@tanstack/react-query';

/**
 * API configuration and base utilities
 * Centralized API setup for TanStack Query
 */

// Base API configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Generic API request function
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