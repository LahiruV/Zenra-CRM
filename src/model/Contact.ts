/**
 * Contact model interface
 * Defines the structure for contact entities in the CRM system
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  department?: string;
  address?: Address;
  notes?: string;
  tags?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
}

/**
 * Address interface for contact location information
 */
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

/**
 * Contact creation input interface
 */
export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  department?: string;
  address?: Address;
  notes?: string;
  tags?: string[];
}

/**
 * Contact update input interface
 */
export interface UpdateContactInput extends Partial<CreateContactInput> {
  id: string;
  isActive?: boolean;
  lastContactDate?: Date;
}

/**
 * Contact statistics interface
 */
export interface ContactStats {
  total: number;
  active: number;
  companies: number;
  recentlyAdded: number;
}