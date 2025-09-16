import { apiClient, type ApiResponse } from './apiClient';
import { User, UserCredentials, UserRegistration } from '../model/User';

type AuthResponse = { user: User; token: string };

/**
 * Authentication service using the protected API client
 */
class AuthService {
  // Mock users for development (remove when backend is ready)
  private MOCK_USERS = [
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@company.com',
      password: 'demo123',
      role: 'admin',
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Mock JWT token generation
  private generateMockToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    return btoa(JSON.stringify(payload));
  }

  /**
   * Login user with credentials
   */
  public async login(credentials: UserCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // Try real API first
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      if (response.success && response.data.token) {
        // Store the JWT token
        apiClient.setToken(response.data.token);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error: any) {
      // If network error, use mock authentication
      if (error.status === 0 || error.message?.includes('Network error')) {
        console.warn('Backend not available, using mock authentication');
        
        // Find mock user
        const user = this.MOCK_USERS.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );
        
        if (!user) {
          throw {
            message: 'Invalid email or password',
            status: 401
          };
        }
        
        // Generate mock token
        const token = this.generateMockToken(user);
        apiClient.setToken(token);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }));
        
        // Return mock response
        const mockResponse: ApiResponse<AuthResponse> = {
          success: true,
          status: 200,
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            },
            token
          }
        };
        
        return mockResponse;
      }
      
      // Re-throw other errors
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register new user
   */
  public async register(userData: UserRegistration): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // Try real API first
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      
      if (response.success && response.data.token) {
        // Store the JWT token
        apiClient.setToken(response.data.token);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error: any) {
      // If network error, use mock registration
      if (error.status === 0 || error.message?.includes('Network error')) {
        console.warn('Backend not available, using mock registration');
        
        // Check if email already exists
        const existingUser = this.MOCK_USERS.find(u => u.email === userData.email);
        if (existingUser) {
          throw {
            message: 'Email already exists',
            status: 409
          };
        }
        
        // Create new mock user
        const newUser = {
          id: String(this.MOCK_USERS.length + 1),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role || 'user',
          avatar: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.MOCK_USERS.push(newUser);
        
        // Generate mock token
        const token = this.generateMockToken(newUser);
        apiClient.setToken(token);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        }));
        
        // Return mock response
        const mockResponse: ApiResponse<AuthResponse> = {
          success: true,
          status: 201,
          data: {
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              avatar: newUser.avatar,
              createdAt: newUser.createdAt,
              updatedAt: newUser.updatedAt
            },
            token
          }
        };
        
        return mockResponse;
      }
      
      // Re-throw other errors
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if server call fails
    } finally {
      // Clear local storage
      apiClient.removeToken();
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/login';
    }
  }

  /**
   * Get current user profile
   */
  public async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  /**
   * Update user profile
   */
  public async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/auth/profile', userData);
  }

  /**
   * Change password
   */
  public async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/change-password', data);
  }

  /**
   * Request password reset
   */
  public async requestPasswordReset(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      return await apiClient.post('/auth/forgot-password', { email });
    } catch (error: any) {
      // If network error, return mock success
      if (error.status === 0 || error.message?.includes('Network error')) {
        console.warn('Backend not available, using mock forgot password');
        
        return {
          success: true,
          status: 200,
          data: {
            message: 'Password reset email sent successfully'
          }
        };
      }
      
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  public async resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/reset-password', data);
  }

  /**
   * Refresh JWT token
   */
  public async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<{ token: string }>('/auth/refresh');
  }

  /**
   * Verify JWT token
   */
  public async verifyToken(): Promise<ApiResponse<{ valid: boolean; user?: User }>> {
    return apiClient.get<{ valid: boolean; user?: User }>('/auth/verify');
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt_token') || localStorage.getItem('authToken');
    return !!token;
  }

  /**
   * Get stored user data
   */
  public getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }
}

// Create and export singleton instance
export const authService = new AuthService();