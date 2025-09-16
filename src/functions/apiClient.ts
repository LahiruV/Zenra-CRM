/**
 * Protected API Client with JWT Authentication
 * Provides common HTTP methods with automatic token handling
 */

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Get JWT token from localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem('jwt_token') || localStorage.getItem('authToken');
  }

  /**
   * Set JWT token in localStorage
   */
  public setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('authToken', token); // Keep backward compatibility
  }

  /**
   * Remove JWT token from localStorage
   */
  public removeToken(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('authToken');
  }

  /**
   * Get headers with authentication
   */
  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      const apiError: ApiError = {
        message: data?.message || `HTTP Error: ${response.status} ${response.statusText}`,
        status: response.status,
        errors: data?.errors || {}
      };

      // Handle specific error cases
      if (response.status === 401) {
        // Unauthorized - remove token and redirect to login
        this.removeToken();
        window.location.href = '/login';
      }

      throw apiError;
    }

    return {
      data: data?.data || data,
      message: data?.message,
      success: data?.success !== false,
      status: response.status
    };
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(options.headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        // Network error
        throw {
          message: 'Network error. Please check your connection and try again.',
          status: 0
        } as ApiError;
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return this.request<T>(url, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  public async post<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * PUT request
   */
  public async put<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * PATCH request
   */
  public async patch<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * DELETE request
   */
  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Upload file
   */
  public async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers = this.getHeaders();
    delete headers['Content-Type']; // Let browser set content-type for FormData

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    });
  }

  /**
   * Download file
   */
  public async download(endpoint: string, filename?: string): Promise<void> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export types for use in other files
export type { ApiResponse, ApiError };