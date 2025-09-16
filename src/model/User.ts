/**
 * User model interface
 * Defines the structure for user entities in the CRM system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  phone?: string;
  department?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * User authentication credentials interface
 */
export interface UserCredentials {
  email: string;
  password: string;
}

/**
 * User registration data interface
 */
export interface UserRegistration extends UserCredentials {
  name: string;
  role?: string;
}