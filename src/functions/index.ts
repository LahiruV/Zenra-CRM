/**
 * Functions module exports
 * Central export point for all function utilities
 */

export { apiClient, type ApiResponse, type ApiError } from './apiClient';
export { authService } from './authService';

// Re-export for convenience
export const api = {
  client: apiClient,
  auth: authService,
};